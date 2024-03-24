#!/bin/bash
rsync -rvzP ./dist/ lukas@lw1.at:/var/www/vienna-cycling-quality/ --fuzzy --delete-after -v
