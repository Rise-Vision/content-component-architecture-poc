/* global RisePlayerConfiguration */
/* eslint-disable no-console, func-names */

function configureComponents() {
  const
    imageDefault = document.querySelector( "#rise-image-default" ),
    imageContain = document.querySelector( "#rise-image-contain" ),
    imageCover = document.querySelector( "#rise-image-cover" ),
    imageDuration = document.querySelector( "#rise-image-duration" ),
    imageNonEditable = document.querySelector( "#rise-image-non-editable" );

  // image-default - editable

  imageDefault.addEventListener( "image-error", event => {
    console.log( "image default: ", event.detail );
  });

  // image-contain - editable
  imageContain.addEventListener( "image-error", event => {
    console.log( "image contain", event.detail );
  });

  // image-cover - editable
  imageCover.addEventListener( "image-error", event => {
    console.log( "image cover", event.detail );
  });

  // image-duration - editable
  imageDuration.addEventListener( "image-error", event => {
    console.log( "image duration", event.detail );
  });

  // image-non-editable - editable
  imageNonEditable.addEventListener( "image-error", event => {
    console.log( "image non-editable", event.detail );
  });

  // Uncomment if testing directly in browser
  // RisePlayerConfiguration.Helpers.sendStartEvent( imageDefault );
  // RisePlayerConfiguration.Helpers.sendStartEvent( imageContain );
  // RisePlayerConfiguration.Helpers.sendStartEvent( imageCover );
  // RisePlayerConfiguration.Helpers.sendStartEvent( imageDuration );

  // An explicit start event is needed on non-editable components
  RisePlayerConfiguration.Helpers.sendStartEvent( imageNonEditable );
}

window.addEventListener( "rise-components-ready", configureComponents );
