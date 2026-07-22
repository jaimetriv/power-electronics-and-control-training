# Hardware Inventory and Gaps

## Current Hardware You Own

### Controllers and Core Platforms

- 2 x Arduino Uno
- ESP32 DevKit V1

### Oscilloscope and Test Equipment

- OWON HDS272S
- Built-in OWON function generator

### Existing Kits and Modules

- SparkFun Inventor's Kit
- SparkFun Beginner Parts Kit
- Inex Global POP-BOT kit
- Parallax BOE kit
- Parallax PING sensor

### Detailed Baseline From Your SparkFun Kits

SparkFun Inventor's Kit (Arduino Uno) V3.2 baseline includes:

- Arduino Uno R3 SMD
- Arduino and breadboard holder
- 400-point breadboard
- USB A to Mini-B cable
- 16x2 LCD
- 74HC595 shift register
- 2N2222 transistors
- 1N4148 diodes
- DC motor with gear
- Small servo
- 5 V SPDT relay
- TMP36 temperature sensor
- Flex sensor
- Soft potentiometer
- Photocell
- Tri-color LED
- Assorted LEDs and tactile buttons
- 10 k potentiometer
- Piezo buzzer
- 12 mm pushbuttons
- 330R and 10k resistors
- Jumper wires

SparkFun Beginner Parts Kit (KIT-13973) includes:

- Adjustable parts box
- Capacitors: 0.1 uF (10), 100 uF (5), 10 uF (5), 1 uF (5), 10 nF (5), 1 nF (5), 100 pF (5), 10 pF (5)
- Diodes: 1N4148 (5), 1N4001 (5)
- Transistors: 2N3904 NPN (5), 2N3906 PNP (5)
- Headers: 20-pin female (3), 20-pin male (3)
- Mini power switches (3)
- Push buttons (2)
- 10k trimpot (1)
- LM358 op-amp (2)
- 3.3 V regulators (2)
- 5 V regulators (2)
- 555 timer (1)
- LEDs: green (1), yellow (1), red (1), red 7-segment (1)
- Mini photocell (1)

Important note: the Beginner Parts Kit does not include a resistor assortment.

---

## Labs Well Covered Already

The following areas are well covered by your current hardware:

- Introductory Arduino and ESP32 familiarisation
- Oscilloscope familiarisation
- PWM fundamentals
- RC circuits
- RLC circuits
- Basic MOSFET experiments
- Basic motor PWM experiments
- Introductory P, PI and PID controller experiments

---

## Additional Hardware Needed To Complete The Full Training Path

## Priority 1 - Core Power Electronics Parts

These are the most important missing items for Buck, Boost, chopper and control labs:

- IRLZ44N logic-level MOSFETs
- 1N4007 diodes
- 1N5819 Schottky diodes
- 100 nF ceramic capacitors
- 100 uF electrolytic capacitors
- 220 uF electrolytic capacitors
- 470 uF electrolytic capacitors
- 100 uH inductors
- Resistor assortment including 47R, 100R, 220R, 1k, 10k, 22k, 47k
- Digital multimeter if you do not already have a reliable one

## Priority 2 - Power and Converter Support

These items become important once you move into Buck/Boost and regulated converter work:

- Bench power supply
- Additional 10 uF electrolytic capacitors
- Power resistors or a simple load set for converter loading
- Extra breadboards / terminal blocks if your kits are already densely used

Recommended load resistor values:

- 10R high-wattage
- 22R high-wattage
- 47R high-wattage
- 100R high-wattage

## Priority 3 - Advanced Inverter and Grid Labs

These are mainly needed for Projects 17 and 18:

- IR2104 half-bridge gate driver modules
- ACS712 current sensor modules
- 1 mH inductors
- 1 uF film capacitors
- Extra ESP32 board as spare if desired

## Priority 4 - Optional Upgrades

These are useful, but not required for most of the training plan:

- IR2110 gate driver modules
- ACS758 current sensor
- Additional ESP32 boards beyond one spare
- Arduino Mega
- Dedicated external function generator

Note: the OWON HDS272S already includes a function generator, so a separate bench generator is optional unless you later need higher output quality, wider frequency range or a second signal source.

---

## Important Specification Notes

- For Buck and Boost labs, use 100 uH inductors, not 100 mH inductors.
- For ESP32-driven power stages, ensure MOSFETs are logic-level parts with acceptable Rds(on) at about 3.3 V gate drive, or use a gate driver.
- For introductory converter labs, low-voltage operation is preferred before moving to higher energy setups.
- For inverter and grid labs, treat driver modules, current sensing and filtering parts as required, not optional.

---

## Summary

You already have enough hardware to start and complete a large majority of the course.

The main real gaps are:

- converter power-stage parts
- regulated DC power hardware
- inverter gate-drive parts
- current sensing parts
- filter inductors and capacitors for advanced labs
