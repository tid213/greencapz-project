## Green Capz Project

The Green Capz project was created to help me monitor my indoor garden.

## How it was created

I created the greencapz-client app to run on RaspberryPi OS, that is
running on a RaspberryPi 3b.  The RaspberryPi takes serial readings 
from an Arduino board that is connected to 4 different sensors (I Will
eventually add a pH sensor).  The app then sends the current data to
a Mongo DB that is displayed on an LED screen.  The app also sends
data every four hours to provide graph data to the greencapz-app
online access.  

The greencapz-app is the web app that, upon logging in, allows me access
to the current and past readings. Greencapz allows users to create an
account and view all readings associated with the account. It provides
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

