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

### Other Existing Power Parts

- IRLZ44N MOSFET used in Labs 00-04 (quantity on hand not specified). Do not count it as a replacement for the AO3401A P-channel buck switch or for an N-channel MOSFET with verified 3.3 V gate-drive performance in the revised Labs 06-08.

### Recent RS Order Received 2 October 2026

Order reference 3019365801. The parts have been received; inspect markings and ratings before use.

- KEMET 100 uH inductor, 1.1 A, 0.35 ohm DCR, RS stock 265-2686 (1)
- Murata 100 uH inductor, 5.4 A, 0.046 ohm DCR, RS stock 228-416 (1)
- Yageo cement resistors, 5 W: 10 ohm x 5 (199-1718), 22 ohm x 5 (199-1702), 47 ohm x 5 (199-1709), and 100 ohm x 5 (199-1716)

The two 100 uH inductors are not substitutes for the three 1 mH inductors specified for Labs 06-07 and the shared Lab 10 filter. The received 47 ohm / 5 W and 100 ohm / 5 W resistors meet or exceed the wattage ratings of same-value loads in the lab plans; keep their cement bodies off breadboards and allow ventilation.

### Amazon Inductor Assortment Purchased; Ratings Unverified

- Swpeet 90-piece, 15-value, 10 uH-20 mH inductor assortment. The title claims high SRF but does not provide the 1 mH coil count, saturation current, DCR, or numeric SRF needed to qualify it for Labs 06-07 or the Lab 10 filter. Identify/count the 1 mH pieces with the LCR meter and verify power ratings from a datasheet before use. Do not treat it as a qualified power-inductor pack until those checks pass.

---

## Labs Well Covered Already

The following areas are well covered by your current hardware:

- Arduino and ESP32 setup and basic I/O
- Oscilloscope setup and measurements
- PWM operation
- RC circuits
- RLC circuits
- Basic MOSFET experiments
- Basic motor PWM experiments
- Introductory P, PI and PID controller experiments

---

## Additional Hardware Needed To Complete The Full Training Path

## Priority 1 - Core Power Electronics Parts

These are the most important missing items for Buck, Boost, chopper and control labs:

- AO3401A P-channel MOSFETs and AO3400A N-channel MOSFETs on labeled SOT-23-to-breadboard breakout boards for Labs 06-07
- One DRV8833 H-bridge breakout with labeled pins and 3.3 V logic compatibility for Labs 10, 17, and 18
- IRLZ44N logic-level MOSFETs for later experiments only when the required gate voltage is provided
- 1N4007 diodes
- 1N5819 Schottky diodes
- 100 nF ceramic capacitors (at least 2)
- 100 uF / 10 V electrolytic capacitors (at least 2 for Lab 06 input/output)
- 220 uF / 16 V electrolytic capacitors (at least 2 for Lab 07 input/output)
- 470 uF / 25 V electrolytic capacitor (Lab 09 ripple comparison)
- 1 mH inductors rated for at least 0.5 A saturation current, no more than 1 Ω DCR, and at least 200 kHz self-resonant frequency; plan for 3 total (one shared by Labs 06-07, two matched for Labs 10/17/18)
- 1 µF film capacitor rated at least 25 V for the differential inverter filter
- Resistor assortment including 47 Ω / 1 W, 100 Ω / 1 W, 150 Ω, 1 kΩ, 2.2 kΩ, 10 kΩ, 22 kΩ, 47 kΩ, and 100 kΩ
- Digital multimeter if you do not already have a reliable one

## Priority 2 - Power and Converter Support

These items become important once you move into Buck/Boost and regulated converter work:

- Isolated, floating-output DC bench supply: 0-30 V, 0-3 A, constant-voltage and constant-current operation, adjustable current limit with 10 mA or finer resolution, output enable, and over-current/over-voltage protection. Set 5.0 V / 0.20 A for Labs 06-07 and 5.0 V / 0.35 A maximum for Lab 08; do not use these maximum settings without checking each load's rating.
- Enclosed, safety-approved plug-in AC adapter for Lab 09: 6 V AC RMS, 50 Hz, at least 250 mA (1.5 VA), isolated SELV output, overload protected, and no-load voltage no higher than 9 V AC RMS. Students must not open it or handle mains wiring.
- Additional 10 uF electrolytic capacitors
- Power resistors or a simple load set for converter loading
- Lab 06: AO3401A P-MOSFET breakout, 2N2222 NPN, 1N5819, 1 mH inductor (≥0.5 A saturation, ≤1 Ω DCR, ≥200 kHz self-resonance), two 100 uF / 10 V capacitors, 100 nF bypass capacitor, 47 Ω / 1 W load, 2.2 kΩ, 1 kΩ, 100 Ω, and 100 kΩ resistors
- Lab 07: AO3400A N-MOSFET breakout, 1N5819, 1 mH inductor (≥0.5 A saturation, ≤1 Ω DCR, ≥200 kHz self-resonance), two 220 uF / 16 V capacitors, 100 nF bypass capacitor, 100 Ω / 1 W load, 100 Ω gate resistor, and 100 kΩ gate-to-source resistor
- Lab 08 motor: 3-6 V brushed gearmotor with stall current no greater than 300 mA, 1N5819 flyback diode, and 100 Ω / 100 kΩ gate resistors
- Lab 08 pulse pickup: TCRT5000 reflective sensor, 12-mark reflective wheel, 150 Ω IR-LED resistor, and 10 kΩ pull-up to 3.3 V. The sensor produces pulses; do not interpret its raw optical voltage as speed.
- Analog motor-speed sensor for Labs 12-14: either build a frequency-to-voltage stage with an LM2907N-8 (minimum supply 12 V; buy a separate 12 V regulated adapter if no second bench-supply output is available), or buy a calibrated tachometer module powered from 3.3/5 V. It must accept the Lab 08 sensor's 12-pulse/revolution signal (0-600 Hz for 0-3000 RPM) and provide a monotonic 0-3.0 V analog output over the motor's measured speed range. For the LM2907, scale and clamp the output to at most 3.0 V before the ESP32 ADC. Calibrate output voltage against measured RPM before using it as feedback.
- Lab 09: 4 × 1N4007 diodes, 100 uF and 470 uF / 25 V capacitors, 1 kΩ / 0.5 W load, 250 mA time-delay secondary fuse and holder, and 47 Ω / 5 W series resistor with the isolated AC adapter.
- Labs 10/17/18 shared inverter build: one DRV8833 breakout, two matched 1 mH inductors (≥0.5 A, ≤1 Ω DCR, ≥200 kHz SRF), 1 µF / 25 V film capacitor, 100 µF / 10 V DC-link capacitor, 100 nF bypass capacitor, 100 Ω / 0.25 W load, and two oscilloscope channels for CH1−CH2 measurement. The inductors and driver can be reused between lessons.
- Lab 17 input interface: OWON generator at no more than 1.0 V peak / 50 Hz through a 1 µF series capacitor and 10 kΩ resistor to GPIO34; bias GPIO34 with 100 kΩ to 3.3 V and 100 kΩ to GND. Lower Schottky clamp anode to GND/cathode to GPIO34; upper clamp anode to GPIO34/cathode to 3.3 V. Join generator return, ESP32 GND, and scope ground. Verify GPIO34 stays between 0.3 V and 3.0 V before connection.
- Firmware status: no ESP32 PLL sketch is supplied or validated. The Lab 10 lesson contains a DRV8833 SPWM example, but it uses its own fixed 50 Hz reference and is not synchronized to the Lab 17 input. PLL tracking and grid-current control remain Simulink-only.
- Extra breadboards / terminal blocks if your kits are already densely used

Recommended load resistor values:

- 10R high-wattage
- 22R high-wattage
- 47R high-wattage
- 100R high-wattage

## Priority 3 - Advanced Inverter and Grid Labs

These are for a future, separately engineered higher-power three-phase/grid-connected inverter. They are not required for the present low-voltage signal exercises in Projects 17-18:

- Three-phase gate drivers and MOSFETs selected for a fully reviewed voltage/current design
- Current sensing matched to the redesigned grid-stage range
- Rated isolated/differential measurement interface for any higher-voltage bridge
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

- Labs 06-07 use 5 V, 20 kHz switching, and a 1 mH inductor in both Simscape and the physical build. Lab 07 duty is limited to 25%; the current-limited supply is a protection layer, not permission to exceed the documented operating range.
- The DC bench supply is for extra-low-voltage DC experiments only. Lab 09 uses the enclosed isolated 6 V AC adapter; students must never access its mains wiring.
- For ESP32-driven power stages, ensure MOSFETs are logic-level parts with acceptable Rds(on) at about 3.3 V gate drive, or use a gate driver.
- For introductory converter labs, low-voltage operation is preferred before moving to higher energy setups.
- For the current Lab 10/17/18 exercises, use only the specified DRV8833 stage, low-voltage supply limits, resistive load, and differential measurement. Do not connect any stage to a simulated-grid source or mains.

---

## Summary

You already have enough hardware to start and complete a large majority of the course.

The main real gaps are:

- converter power-stage parts
- regulated DC power hardware
- inverter gate-drive parts
- current sensing parts
- filter inductors and capacitors for advanced labs
