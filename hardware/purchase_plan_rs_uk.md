# Purchase Plan for RS UK

This plan assumes you are based in Stockport, UK and prefer buying from RS where practical.

Prices are approximate planning references only and may vary.

## Minimum Workable Purchase Table

| Buy Priority | Component | Qty | Price Ref (GBP) | Details / Recommended Model |
|---|---|---:|---:|---|
| P1 | IRLZ44N MOSFET | 4 | 4-6 | Logic-level MOSFET, Infineon or Vishay preferred |
| P1 | Resistor Assortment Kit | 1 | 5-10 | Include 47R, 100R, 220R, 1k, 10k, 22k, 47k |
| P1 | 1N4007 Diode | 10 | 1-2 | General-purpose rectifier diode |
| P1 | 1N5819 Schottky Diode | 5 | 2-3 | For Buck and Boost converter labs |
| P1 | 100 uF Electrolytic Capacitors | 5 | 2-3 | Low ESR preferred |
| P1 | 220 uF Electrolytic Capacitors | 2 | 1-2 | 25 V to 50 V rating |
| P1 | 470 uF Electrolytic Capacitors | 2 | 2-3 | DC-link and smoothing work |
| P1 | 100 uH Inductor | 2 | 3-5 | Power inductor for Buck and Boost converters |
| P2 | Bench Power Supply | 1 | 120-150 | Korad KA3005D or similar lab supply |
| P2 | Power Resistor Set | 1 set | 10-20 | Include 10R, 22R, 47R, 100R in suitable wattage |

### Optional Add-Ons (Only if progressing to Projects 17-18 hardware)

| Buy Priority | Component | Qty | Price Ref (GBP) | Details / Recommended Model |
|---|---|---:|---:|---|
| P3 | IR2104 Gate Driver | 1 | 4-6 | Half-bridge driver module |
| P3 | ACS712 Current Sensor | 1 | 3-6 | 5 A version recommended for training work |
| P3 | 1 mH Inductor | 1 | 2-4 | L-filter inductor for VSC projects |
| P3 | 1 uF Film Capacitors | 2 | 2-4 | Polypropylene film capacitor preferred |

---

## Recommended Changes Relative To The Earlier Draft List

- Remove OWON HDS272S from the buy list because you already have it.
- Remove ESP32 DevKit V1 from the active buy list because you already have the boards you need.
- Replace 100 mH inductors with 100 uH inductors for Buck and Boost work.
- Move standalone function generator to optional, because the OWON HDS272S already provides one.
- Reduce IR2104 quantity to 1 unless you specifically want extra spares.
- Reduce ACS712 quantity to 1 unless you specifically want a spare.
- Remove Arduino Mega from the active buy list because Uno and ESP32 already cover this course.
- Exclude 100 nF and 10 uF top-up purchases because your existing kits already include them.

---

## RS UK Buying Notes

When searching RS listings, prioritise:

- through-hole parts where possible for breadboard use
- logic-level MOSFETs with clear low-Vgs specifications
- inductors rated for sufficient current, not just inductance value
- electrolytic capacitors with reputable brands and suitable voltage margin
- prebuilt gate-driver or current-sensor modules if raw IC-only parts would slow down lab work

For the advanced inverter and grid labs, module-based purchasing is often more practical than assembling everything from bare ICs.

---

## Suggested Buy Order

### First Order

- IRLZ44N MOSFETs
- 1N4007 diodes
- 1N5819 diodes
- resistor assortment
- 100 nF capacitors
- 100 uF, 220 uF, 470 uF capacitors
- 100 uH inductors
- bench power supply if you do not already have one
- power resistor set

### Second Order

- IR2104 module
- ACS712 module
- 1 mH inductor
- 1 uF film capacitors

### Third Order

- additional spares only if needed

### Already Owned

- OWON HDS272S
- ESP32 DevKit V1 boards
- Digital multimeter function via OWON HDS272S

---

## Bottom Line

For this course, the highest-value purchases are not more controllers.

The highest-value purchases are the power-stage and measurement support parts that let you complete:

- Buck converters
- Boost converters
- motor drive control
- inverter work
- grid-following and grid-forming experiments
