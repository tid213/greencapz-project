## Green Capz Project

The Green Capz project was created to help me monitor the environment of my indoor garden from my mobile at any time. I wrote the app to display current readings and graph the past data. I wanted to know if certain fluctuations in the environment had any effect on other variables related to the environment.  

## How it was created

I created the greencapz-client app to run on RaspberryPi OS that is
running on a RaspberryPi 3b.  The RaspberryPi takes serial readings 
from an Arduino board that is connected to 4 different sensors.  The app then sends the current data to
a MongoDB database. 

The box housing the Raspberry Pi and Arduino board contains a small LED monitor to display the current readings.   

The greencapz-app is the web app that allows access
to the current and past readings displayed to the user. The app allows users to create an
account and view readings associated with the account. It provides
the user with current readings (every 5 min.) and graphs to show past
data up to a week. 

## Tech stack
- Node
- Express
- MongoDB
- Pug
- Bootstrap
- Arduino IDE(Written in C)

## Sensor Controller
- RaspberryPi 3b
- Arduino UNO board
- Bread board
- 3x Temperature sensors
- TDS sensor
- 7" LED Monitor

