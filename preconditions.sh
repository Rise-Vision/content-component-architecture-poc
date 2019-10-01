#!/usr/bin/env bash

BRANCH="${CIRCLE_BRANCH}"
BASE_BRANCH=$(echo ${BRANCH} | sed -nr 's:^(revert-[0-9]+-)?([^/]+).*:\2:p')
echo "Base branch is $BASE_BRANCH"

list_master_merges() {
  git log --grep='^Merge pull request' --pretty=format:%H
}

extract_templates_from_history() {
  # ignores hidden, underscored ( samples ) and global-icons folders
  git diff-tree --no-commit-id --name-only -r HEAD $1 |
    grep -Po '^[^_./][^/]*(?=/)' |
    grep -v '^global-icons$' |
    sort -u |
    tee build_tmp/changes

  return $( wc -l < build_tmp/changes )
}

mkdir build_tmp

if [[ ${BASE_BRANCH} == "master" ]]; then
    PREVIOUS_MASTER_COMMIT_ID=$( list_master_merges | sed -n 2p )
    echo "Previous master commit id is $PREVIOUS_MASTER_COMMIT_ID"

    extract_templates_from_history "$PREVIOUS_MASTER_COMMIT_ID"
    NUMBER_OF_TEMPLATE_CHANGES=$?

    echo "Deploying $NUMBER_OF_TEMPLATE_CHANGES templates"
else
    PREVIOUS_MASTER_COMMIT_ID=$( list_master_merges | sed -n 1p )
    echo "Previous master commit id is $PREVIOUS_MASTER_COMMIT_ID"

    extract_templates_from_history "$PREVIOUS_MASTER_COMMIT_ID"
    NUMBER_OF_TEMPLATE_CHANGES=$?

    if [[ ${BASE_BRANCH}  =~ ^(fix|chore|feature|global-icons)$ ]]; then
        if [[ $NUMBER_OF_TEMPLATE_CHANGES -ge 0 ]]; then
            echo "${BRANCH} should not change any templates ($NUMBER_OF_TEMPLATE_CHANGES)"
            exit 1
        fi
    else
        BRANCH_FOUND=false
        for d in */; do
            if [[ ${BASE_BRANCH} == "${d%/}" ]]; then
                BRANCH_FOUND=true
                break
            fi
        done

        if [[ ${BRANCH_FOUND} == false ]]; then
            echo "Branch name not supported"
            exit 1
        fi

        echo ${BASE_BRANCH} > build_tmp/template

        if [[ $NUMBER_OF_TEMPLATE_CHANGES -ge 2 ]]; then
            echo "Multiple template changes still not supported"
            exit 1
        elif [[ $NUMBER_OF_TEMPLATE_CHANGES -eq 1 ]]; then
            CHANGED_DIRECTORY=$( cat build_tmp/changes )

            if [[ $BASE_BRANCH != $CHANGED_DIRECTORY ]]; then
                echo "Branch name $BASE_BRANCH does not correspond with changed directory $CHANGED_DIRECTORY"
                exit 1
            fi
        else
            echo "WARNING: no files changed for $BASE_BRANCH; so merging to master won't do any template deployments"
        fi
    fi

fi
