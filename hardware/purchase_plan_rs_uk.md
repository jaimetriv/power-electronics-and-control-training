# Purchase Plan for RS UK

This plan assumes you are based in Stockport, UK and prefer buying from RS where practical.

Prices are approximate planning references only and may vary. The updated estimate below was checked on 1 October 2026; where an RS price is shown, it includes VAT unless explicitly marked otherwise.

## Updated Lab 06-18 Purchase Estimate

This estimate matches the current 5 V / 20 kHz converter builds, 6 V AC rectifier source, and shared low-voltage DRV8833 inverter. It assumes you reuse the ESP32, OWON HDS272S, breadboards, 2N2222 transistor, and kit capacitors/resistors where their ratings are suitable.

| Item | Quantity to use | Price reference (GBP) | Notes |
|---|---:|---:|---|
| RS PRO bench supply, 0-30 V / 5 A | 1 | £129.26 | RS stock 175-7367; verify 10 mA or finer current-limit setting before purchase |
| Wurth 1 mH inductor, 750 mA, 0.98 Ω, 1 MHz SRF | 3 needed | £14.40 | RS stock 923-6220; sold as a 10-pack, leaving 7 spares |
| DRV8833 H-bridge breakout | 1 | £5.95 | Adafruit breakout at Pimoroni; shared by Labs 10, 17, and 18 |
| 1 µF film capacitor, ≥25 V | 1 needed | £4.27 | RS stock 622-4735P; sold in a five-pack |
| Enclosed 6 V AC adapter | 1 | £21.38 | RS stock 206-4927; EU plug version, so select a UK-plug equivalent or suitable approved plug adapter |
| 250 mA time-lag 5 x 20 mm fuse | 1 needed | £7.03 | RS stock 630-823; sold as a box of 10 |
| MOSFETs and SOT-23 breadboard breakouts | 2 builds | £8-15 | AO3401A P-channel and AO3400A N-channel, with labeled breakouts |
| Diodes, resistors, loads, fuse holder and 47 Ω / 5 W resistor | 1 set | £15-30 | Excludes items listed separately; check kit capacitor voltage ratings before buying top-ups |
| TCRT5000 sensor and reflective wheel | 1 set | £5-10 | A compatible encoder in the POP-BOT kit may remove this cost |

**Estimated Labs 06-18 total: £210-£240**, before delivery. Add about £5-£10 only if your existing motor does not meet the Lab 08 stall-current limit. RS prices include VAT as shown; the Adafruit breakout price is Pimoroni's UK retail price and the small-parts bundle is a planning range.

For Labs 12-14 analog speed feedback, the RS LM2907N-8 is £13.89 inc VAT for a pack of five (RS stock 461-032). It needs a 12 V rail; budget another £10-£20 for a separate regulated 12 V adapter if you choose this DIY route and your supply has only one output. A calibrated 3.3/5 V tachometer module may be a simpler alternative.

Reference listings: [RS PRO bench supply](https://uk.rs-online.com/web/p/bench-power-supplies/1757367), [Wurth 1 mH inductor](https://uk.rs-online.com/web/p/leaded-inductors/9236220), [Adafruit DRV8833 breakout at Pimoroni](https://shop.pimoroni.com/products/adafruit-drv8833-dc-stepper-motor-driver-breakout-board), [RS 1 µF film capacitor](https://uk.rs-online.com/web/p/film-capacitors/6224735P), [RS PRO 6 V AC adapter](https://uk.rs-online.com/web/p/ac-dc-adapters/2064927), [250 mA time-lag fuse](https://uk.rs-online.com/web/p/cartridge-fuses/0630823), [LM2907N-8 frequency-to-voltage converter](https://uk.rs-online.com/web/p/voltage-to-frequency-frequency-to-voltage-converters/0461032).

The older broad course-wide purchase table below predates the revised physical designs. Do not use its 100 µH converter-inductor or IRLZ44N recommendations for Labs 06-07.

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
