# burly_barometer

## Overview

Living in the digital age it has never been easier to store, view and analyze data. This application is a tool that gives any user an easy and flexible way to input exercise data and view their accomplishments graphically. 

## Deployment

This application is still in development as there is no user profile constructed. The functionality of the data collection, rendering and updating are written in the backend code, however the front end code still needs some refractoring before all these changes can be made by the user with the UI. There are also other possiblities for this application to become more user friendly by adding delete functionality and more options to view previous workouts.

## Usage

On the homepage the user is shown their most recent workout with the relevant statistics (depending on whether it was a resistance or cardio workout) and are given the option to create a new workout. When "create workout" is clicked the user is directed to a new page to input data for their new workout.

Users can input data for two types of workouts: cardio or resistance. When one of these options is chosen the user is then prompted to describe the exercise by its duration, distance, sets, weight etc. When all inputs are completed the user can click on create workout and a confirmation message is displayed.

If the user wants to view previous exercises they can click on the dashboard link. This will direct the user to two different graphs that show the relative makeup of their previous exercises. It will also show the daily totals of how much they have "lifted" and the total duration of their exercise for that day.

## Technologies

MongoDB was used to create a flexible database that can hold different types of similar datasets.

Javascript was used to create models for the database, create routes from the data to the UI and functionality to display different pieces of data.
NPM packages used include mongoose and express.

## Github and URL

[Exercise Tracker Github Repo](https://github.com/MikeyP957/burly_barometer)