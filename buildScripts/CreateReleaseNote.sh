#!/bin/sh

echo "Installing npm packages"

eval "npm install github-release-notes -g"

echo "Createing Release Notes"

eval "gren --username=codeiain --repo=MMORPG  --data-source=commits --override --tags=all"

echo "Change Log"

eval "gren --username=codeiain --repo=MMORPG --data-source=commits --action=changelog --time-wrap=history --override --tags=all"