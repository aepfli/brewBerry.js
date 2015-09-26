# brewBerry.js

A little brew log book for homebrewers. It logs temperatures of n ds18b20 sensors, allows to define brewphases (heating, cooling, purification, etc) and displays them in a nice Highchart.

## Hardware
- Raspberry pi
- some ds18b20
- resistors

### Raspberry Pi and wiring
i used an RPi v2 and for the wiring of my sensors i would recommend to look at http://adafruit.com, first of all they do have all the necessary equipment, and second they have a real nice tutorial

## Frameworks
- Backend is based on sailsjs.org
- Frontend uses jquery, Highcharts and Bootstrap


## planned Feauters
- Brew Log: (nearly done)
-- recording temperature and times when you added ingredients
-- automatically recording the temperature

- Controlling the heating based on Temperature

