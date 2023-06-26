#!/bin/bash

brewFile=src/brews.json

date=$(date +%s)

# Ask the user for login details
read -p 'Name: ' name
read -p 'Brewery: ' brewery
read -p 'Category: ' category
read -p 'By: ' by
read -p 'Abv: ' abv
read -p 'Description: ' description
read -p 'Image filename: ' image
read -p 'Recipe url: ' recipe
read -p 'Order page url: ' orderPage
read -p 'Untapped url: ' untapped
read -p 'Primary color: ' colorPrimary

brew="{\"beer\":{\"name\":\"$name\",\"brewery\":\"$brewery\",\"category\":\"$category\"},\"date\":\"$date\",\"by\":\"$by\",\"abv\":\"$abv\",\"description\":\"$description\",\"image\":\"$image\",\"recipe\":\"$recipe\",\"order_page\":\"$orderPage\",\"untapped\":\"$untapped\",\"color_primary\":\"$colorPrimary\",\"color_secondary\":\"$colorSecondary\"}"

echo $(cat $brewFile | jq ".brews |= [$brew] + .") > $brewFile

echo "Brew $name added to $brewFile successfully!"
