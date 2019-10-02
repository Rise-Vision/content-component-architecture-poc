const cheerio = require( 'cheerio' );
const fs = require( 'fs' );

const SPECIAL_ATTRIBUTES = [ "id", "label", "non-editable" ];
const RISE_COMPONENT_LABELS = {
  "rise-image": "Image",
  "rise-data-financial": "Financial",
  "rise-text": "Text",
  "rise-slides": "Google Slides",
  "rise-video": "Video",
  "rise-data-rss": "RSS",
  "rise-data-counter-down": "Count Down",
  "rise-data-counter-up": "Count Up"
};

function getDefaultLabel( element ) {
  if ( element.name === "rise-data-counter" ) {
    return element.attribs.type ? RISE_COMPONENT_LABELS[`${element.name}-${element.attribs.type.toLowerCase()}`] : "Count [Up/Down]"
  }

  return  RISE_COMPONENT_LABELS[element.name];
}

function getTemplatePackageProperty( templateName, prop, defaultValue ) {
  const packageFileName = `./${templateName}/package.json`;
  const packageFile = fs.readFileSync( packageFileName );

  let packageContents;
  let result;

  try {
    packageContents = JSON.parse( packageFile );
  } catch(e) {
    console.error( "There was a problem parsing package.json" );
    process.exit( 1 );
  }

  result = packageContents[ prop ];

  if ( typeof result === "undefined" ) {
    if ( typeof defaultValue !== "undefined" ) {
      result = defaultValue;
    } else {
      console.error( `No property named ${prop} found in package.json ` );
      process.exit( 1 );
    }
  }

  return result;
}

function getTemplateFileName( templateName ) {
  const polymerFileName = `./${ templateName }/polymer.json`;
  const content = fs.readFileSync( polymerFileName );

  const json = JSON.parse( content );

  if( !json.entrypoint ) {
    console.error( `Malformed polymer configuration file: ${ polymerFileName }` );
    process.exit(1);
  }

  return json.entrypoint;
}

function attributesFor( element ) {
  return Object.keys( element.attribs )
  .filter( name =>
    !SPECIAL_ATTRIBUTES.includes( name ) &&
    !name.endsWith( "-label" )
  )
  .reduce( ( attributes, key ) =>
    ({
      ...attributes,
      [key]: {
        label: element.attribs[`${ key }-label`] || `template.${ key }`,
        value: element.attribs[key]
      }
    }), {}
  );
}

const templateName = process.argv[2];
const templateFileName = getTemplateFileName( templateName );
const width = getTemplatePackageProperty( templateName, "width" );
const height = getTemplatePackageProperty( templateName, "height" );
const playUntilDone = getTemplatePackageProperty( templateName, "playUntilDone", false );
const branding = getTemplatePackageProperty( templateName, "branding", false );

const path = `${ templateName }/build/prod/${ templateFileName }`;

const $ = cheerio.load( fs.readFileSync( path ) );

const components = $( "*" ).filter( ( index, element ) =>
  element.name.startsWith( "rise-" )
)
.toArray()
.map( element => (
  {
    type: element.name,
    id: element.attribs.id,
    label: element.attribs.label || getDefaultLabel( element ),
    nonEditable: "non-editable" in element.attribs || element.name === "rise-play-until-done",
    attributes: attributesFor( element )
  }
));

const blueprint = { width, height, playUntilDone, branding, components };

fs.writeFileSync(`${templateName}/build/prod/blueprint.json`, JSON.stringify(blueprint, null, 2) );
