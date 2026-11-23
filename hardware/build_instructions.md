# Hardware Build Instructions

This page covers the physical assembly and verification steps needed **before** a component from [purchase_plan_labs_00_10.md](purchase_plan_labs_00_10.md) is used in a lab circuit. It does not repeat each lab's breadboard wiring — follow the lab's own "Circuit Diagram" and "Wiring" sections for that. Use this page for the one-off preparation work: soldering, pin identification, and bench verification.

Do all of this with the bench supply and soldering iron powered off unless a step says otherwise. Re-read the [course philosophy](../docs/00_Introduction.md#course-philosophy) reasoning sequence before any hardware step: predict first, then verify.

## Build Order

| Before this lab | Build task | Section below |
|---|---|---|
| Lab 06 | Identify pinout and solder the AO3401 P-channel MOSFET(s) onto a SOT23-to-SIP3 adapter | Soldering the Bulk MOSFETs |
| Lab 06 | Verify the pre-soldered AO19T adapter board | Verifying the Pre-Soldered Adapter MOSFETs |
| Lab 07-08 | Identify pinout and solder the "A09T" N-channel MOSFET(s) onto a SOT23-to-SIP3 adapter | Soldering the Bulk MOSFETs |
| Lab 07-08 | Verify the pre-soldered AO09T adapter board | Verifying the Pre-Soldered Adapter MOSFETs |
| Lab 06/07/10 | Qualify the Swpeet inductor assortment with the LCR meter | Qualifying the 1 mH Inductors |
| Lab 08 | Bench-test the NULLLAB encoder motor's stall current | Bench-Testing the Motor |
| Lab 08 | Wire and verify the motor's built-in Hall encoder | Building the Speed Sensor |
| Lab 06/07/08/10 | Inspect and, if needed, replace the bench supply's mains lead | Bench Supply Safety Check |
| Lab 10 | Solder the header strip onto the DRV8833 breakout | Soldering the DRV8833 Header |

## Soldering the Bulk MOSFETs

This applies to the 100-pack bare AO3401 P-channel parts (Gurtt, Lab 06) and the 50-pack bare "A09T" N-channel parts (Enwye, Lab 07/08). Both arrive as loose SOT-23 dice with no leads — you must identify their three pins and solder each one onto its own fatteryu SOT23-to-SIP3 adapter board before it can be used on a breadboard.

### Step 1: Identify Gate, Drain, and Source with a multimeter

Do this before soldering, on the bare part, using a multimeter's diode-test mode. A MOSFET has an internal body diode between Drain and Source; the Gate pin has no diode path to either other pin (very high resistance, effectively open).

1. Set the multimeter to diode-test mode.
2. Test all three pin pairs in both directions (six measurements total).
3. The Gate pin shows no conduction (open circuit, "OL") to either other pin in either direction.
4. The remaining two pins show the body diode in exactly one direction:
   - **N-channel** (the "A09T"/AO3400 part): diode conducts red probe (anode) on **Source**, black probe (cathode) on **Drain**.
   - **P-channel** (the AO3401 part): diode conducts red probe (anode) on **Drain**, black probe (cathode) on **Source**.
5. Write down which physical pin position (left/middle/right, with the part's marking dot or flat edge as your reference) is G, D, and S. The standard AO3400/AO3401 SOT-23 pinout is Pin 1 = Gate, Pin 2 = Source, Pin 3 = Drain, but treat this as a starting hypothesis — confirm it with the diode-test result on your actual part, since generic/clone markings are not a guaranteed match to the genuine part's pinout.

### Step 2: Solder onto the adapter board

1. Tin the three pads on one fatteryu SOT23-to-SIP3 adapter with a small amount of solder first (easier than feeding solder wire later).
2. Using tweezers, hold the MOSFET in place on the pads, matching your identified G/D/S pins to three adjacent adapter pads. Use a permanent marker to label the adapter's silkscreen G/D/S immediately after soldering — the bare adapter pads are not labeled per device.
3. Reheat each pad briefly to bond the MOSFET leg to the board. Avoid holding heat on any one pin for more than 2-3 seconds.
4. Let the board cool undisturbed for a few seconds before handling.

### Step 3: Verify after soldering

1. Repeat the diode-test check pin-to-pin, now on the adapter's three header pins, to confirm continuity matches your pre-solder identification (this also catches cold joints or bridged pads).
2. Inspect under good light or magnification for solder bridges between the three closely-spaced pads.
3. Label the part's family (AO3401 or "A09T"/AO3400 substitute) on the board with tape or marker so it is not confused with the other type later.

## Verifying the Pre-Soldered Adapter MOSFETs

You already have two MOSFETs pre-soldered onto adapter boards from an earlier purchase, top-marked AO19T and AO09T (presumed AO3401A P-channel and AO3400A N-channel respectively). Before using either in a lab:

1. Run the same diode-test procedure from Step 1 above on the adapter's three header pins to confirm which pin is G, D, and S, and which channel type (P or N) the part actually is.
2. Compare the result against the board's silkscreen labels, if any — do not assume the silkscreen is correct without this check.
3. Confirm continuity from each header pin to its corresponding MOSFET leg (no cold joints) by gently wiggling the part while probing — the reading should not change.

## Qualifying the 1 mH Inductors

Before using the Swpeet 90-piece inductor assortment in Lab 06, 07, or 10:

1. Use the LCR meter to measure each candidate inductor and find parts reading close to 1 mH (within the assortment's tolerance).
2. The LCR meter can also usually report DCR (series resistance) — check this is ≤1 Ω.
3. The LCR meter **cannot** measure saturation current or self-resonant frequency (SRF). Look for a datasheet or manufacturer page matching the exact physical markings/size on your 1 mH candidates and confirm ≥0.5 A saturation current and ≥200 kHz SRF from that source.
4. If you cannot find three qualifying 1 mH inductors this way, buy the Wurth 7447221102 pack (see [purchase_plan_labs_00_10.md](purchase_plan_labs_00_10.md)) instead of guessing.

## Bench-Testing the Motor

The NULLLAB TT gearmotor's listing gives no stall-current figure, same gap as every candidate motor checked. Confirm it stays within the Lab 08 300 mA limit before wiring it into the lab circuit:

1. Connect the motor directly to the NANKADF bench supply's output terminals (not through the ESP32/MOSFET circuit yet).
2. Set the supply to 5.0 V with the current limit (CC) set to 300 mA, output still off.
3. Enable the output and let the motor spin freely for a moment to confirm normal no-load operation (expect roughly 150 mA on the display).
4. Firmly hold the output shaft stationary by hand for no more than 1-2 seconds while watching the current reading, then release.
5. **If the display shows the supply has entered CC mode at the 300 mA limit**, the motor's true stall current meets or exceeds that limit — do not use this motor unprotected in Lab 08's circuit; a current-limited bench supply protects the motor here, but the ESP32/MOSFET circuit in the lab does not have the same protection.
6. If the current stays measurably below 300 mA at stall, the motor is confirmed safe for the lab's build.
7. Disconnect and let the motor cool before further testing; do not repeat the stall test back-to-back.

## Building the Speed Sensor

The NULLLAB motor has a built-in AB-phase Hall encoder on its 3.3-5 V rail, so there is no reflective sensor to wire or encoder wheel to build — use only one of its two output channels:

1. Identify the encoder's wire colours against the seller's listing/datasheet: motor power (2 wires, to the MOSFET drive circuit, not the ESP32), encoder power/ground (to ESP32 3.3 V and GND), and two encoder signal channels (A and B).
2. Connect only channel A to GPIO27 (the same pin Lab 08 wires its tachometer input to); leave channel B (the second/direction channel) unconnected — the lab only needs a pulse count, not direction.
3. Power the encoder from ESP32 3.3 V, not the motor's own supply rail.
4. Before relying on it, scope or multimeter-check channel A's idle and toggling voltage levels to confirm it is already clean 0-3.3 V digital logic (push-pull output), not an open-collector signal that would need its own pull-up resistor like the TCRT5000 does.
5. Spin the motor by hand (output shaft, not the Hall-sensor's own motor shaft) and confirm channel A toggles cleanly on the oscilloscope or serial monitor before trusting it as a speed measurement in Lab 08.
6. Rotate the output shaft by hand through exactly one full turn while counting pulses on channel A. Compare this measured count to the 12 PPR x 1:90 gearbox = 1080 pulses/revolution figure implied by the datasheet, since it is unconfirmed whether the "12 PPR" spec is stated before or after the gearbox. Use your measured value (not the datasheet figure) as the `marksPerRevolution` constant in the Lab 08 firmware.

## Bench Supply Safety Check

Before first use of the NANKADF WPS305H:

1. Inspect the supplied mains lead and its moulded plug for damage, and check the fuse rating in the plug if fitted.
2. A reviewer of this exact listing reported the supplied lead failed a PAT earth-continuity test. If you have access to a PAT tester or a continuity-capable multimeter, check continuity between the plug's earth pin and the supply's metal chassis/earth terminal.
3. If the lead looks damaged or fails a continuity check, replace it with a correctly rated, approved mains lead rather than using the original. Do not open the supply itself.
4. Once satisfied, power on with no load connected and confirm the display responds normally to voltage/current setting changes before connecting it to any lab circuit.

## Soldering the DRV8833 Header

The Pimoroni Adafruit DRV8833 breakout ships assembled except for its header strip.

1. Break or cut the supplied header strip to the length needed for the breakout's pin row(s), per the board's silkscreen.
2. Insert the header into a breadboard first (this holds it square and at the correct height while soldering) and rest the DRV8833 board on top of the header pins.
3. Solder one corner pin first, check the board sits flush and square against the breadboard, then solder the remaining pins.
4. Let the board cool before removing it from the breadboard.

## General Soldering Practice

Using the YIHUA 926LED III station:

- Before any of the tasks above, set the iron to roughly 300 °C and confirm it melts solder promptly on contact — a few units of this exact model have needed a calibration pass out of the box.
- Use the bundled helping hands to hold small adapter boards steady; SOT-23 parts and their pads are small enough that a free hand on both the part and the iron is impractical.
- Keep spare tips and flux on hand for the small, closely-spaced SOT-23 pads — a slightly oxidised tip makes bridging adjacent pads more likely.
- Allow joints to cool undisturbed; moving a part while the joint is still liquid is a common cause of poor solder joints on small adapters.
