# Amazon UK Purchase Plan

This is a companion to the [RS UK purchase plan](purchase_plan_rs_uk.md), based on the revised low-voltage builds in Labs 06-10 and 15-18. Amazon listings are marketplace offers, not component qualification. Treat the electrical requirements in the lessons and [hardware inventory](inventory_needed.md) as controlling.

Prices below are listing snapshots checked on 1 October 2026. They can change by seller, delivery location, and selected variant. A listed price is not a recommendation if the required specification is missing.

## Purchase Decisions

| Item | Amazon UK listing | Snapshot price | Decision |
|---|---|---:|---|
| 0-30 V bench supply | [Jesverty SPS-3010N](https://www.amazon.co.uk/dp/B0B8S6CH3H) | £52.99 | **Do not buy until qualified.** The listing describes a 0-30 V supply and CV/CC operation, but verify from its manual that current can be set in increments of 10 mA or finer, that it has an output-enable control, and that its output is isolated/floating with OCP/OVP. Listing text alone does not establish these requirements. RS PRO is the current fallback in the RS plan. |
| Shared Lab 10/17/18 H-bridge | [Adafruit DRV8833 breakout](https://www.amazon.co.uk/dp/B01MFE1CZU) | Check listing | Suitable board family; confirm the seller is supplying the Adafruit breakout, the board pinout matches its documentation, and 3.3 V logic is supported. The UK Adafruit board price reference is £5.95 from Pimoroni if the Amazon offer is unclear. Reuse one board across the labs. |
| SOT-23 adapter boards | [SOT-23-3 to SIP3 adapter boards](https://www.amazon.co.uk/dp/B0HDBFCRGT) | £3.79 | Candidate for hand-soldering AO3401A/AO3400A devices onto breadboard-compatible adapters. Confirm the footprint is SOT-23-3, the pad ordering matches the MOSFET datasheet, and headers are included or buy 2.54 mm headers separately. These boards do not include or qualify the MOSFETs. |
| 1 uF filter capacitor | [Polypropylene film capacitor pack](https://www.amazon.co.uk/dp/B0GWQ5TH8M) | £6.79 | Candidate listing says 1 uF polypropylene, 100 V. Confirm the selected variant is a film capacitor (not electrolytic), 1 uF, and at least 25 V before ordering. One is needed for the shared inverter filter. |
| Diodes for Labs 06-09 | [Diode assortment including 1N4007 and 1N5819](https://www.amazon.co.uk/dp/B0C1V6Y8ND) | Check listing | Listing title includes both needed types. Confirm through-hole parts and quantities. Do not assume all assortment parts meet the lesson's current/voltage needs from the title alone. |
| Electrolytic capacitor assortment | [Electrolytic capacitor kit](https://www.amazon.co.uk/dp/B0C1VBXCQM) | Check listing | Candidate listing covers a range of values and voltage ratings. Verify the pack actually includes 100 uF/10 V, 220 uF/16 V, and 470 uF/25 V parts in through-hole form. Existing SparkFun kit already includes five 100 uF capacitors, so inspect those before buying top-ups. |
| 250 mA time-delay fuse | [250 mA, 5 x 20 mm time-delay fuse pack](https://www.amazon.co.uk/dp/B09X5W72LM) | Check listing | Candidate for Lab 09 only. Verify the marking is T250 mA, the physical size is 5 x 20 mm, and voltage/breaking ratings suit the low-voltage secondary circuit. Buy a compatible enclosed holder separately if not included. |
| Lab 08 optical pickup | [TCRT5000 reflective sensor search](https://www.amazon.co.uk/s?k=TCRT5000+reflective+sensor) | Check listing | A bare sensor or line-tracking module is only the pickup. Make a 12-mark reflective wheel, provide the specified resistor/pull-up, and verify its output is ESP32-safe. It does not replace a tachometer without the wheel and signal conditioning. |
| Lab 08 motor, only if needed | [3-6 V TT gearmotor candidate](https://www.amazon.co.uk/dp/B08M67Q3TB) | Check listing | Not qualified by voltage or RPM claims. Buy only if its datasheet or a safe, brief bench test confirms stall current is no more than 300 mA. A 3-6 V label does not prove the current limit. Check your POP-BOT and SparkFun kit motors first. |

## Do Not Substitute From Amazon Search Results

- **Lab 09 AC source:** no Amazon listing was found that unambiguously specifies an enclosed, isolated 6 V AC RMS, 50 Hz secondary rated at least 250 mA, overload protected, with no-load output no higher than 9 V AC RMS. Many “6 V” results are DC adapters. Do not use a 6 V DC wall adapter or an unspecified AC/DC adapter. Buy from a supplier that documents the exact AC secondary requirements, such as the qualified RS option in the companion plan. Keep mains wiring enclosed and inaccessible.
- **Converter and filter inductors:** Amazon results include 1 mH assortment and “power choke” listings but omit one or more of saturation current, DCR, and self-resonant frequency. Do not use one for these builds unless its datasheet confirms at least 0.5 A saturation current, no more than 1 ohm DCR, and at least 200 kHz SRF. The Wurth 7447221102 in the RS plan is the qualified reference; three inductors are needed in total.
- **AO3400A/AO3401A MOSFETs:** Amazon search results primarily show bare SOT-23 devices, not breadboard-ready parts. Confirm manufacturer, exact part number, package, pinout, and on-resistance at the available gate voltage. Use the adapter board above only after verifying its footprint and pin mapping. Do not treat generic “logic-level MOSFET” claims as equivalent.
- **Power resistors:** the builds require specific wattage ratings, including 47 ohm / 1 W, 100 ohm / 1 W, and 47 ohm / 5 W. Assortment listings often omit reliable continuous-power ratings. Check the resistor body or manufacturer datasheet; do not use an unmarked assortment resistor for these loads.

## Shared and Existing Hardware

The plan assumes reuse of the ESP32 DevKit V1, OWON HDS272S scope/function generator/DMM, breadboards, jumper wires, 2N2222, and suitable kit resistors and capacitors. Check kit capacitor voltage ratings and resistor wattage before reuse. Do not purchase another function generator or DMM solely for these labs.

The 0-30 V supply is used at 5 V with limits of 0.20 A for Labs 06-07, at most 0.35 A for Lab 08, and 0.10 A for Labs 10/17/18. Lab 09 instead requires its own qualifying isolated AC adapter and a 250 mA time-delay secondary fuse.

For DRV8833 measurements, connect both oscilloscope probe grounds to circuit GND and use CH1-CH2 for the differential output. Never connect a standard probe ground to either bridge output. The Lab 15 PI PWM, Lab 17 grid-current injection, and Lab 18 PI/droop hardware functions remain disabled or simulation-only as stated in their lessons.

## Budget Status

There is no defensible Amazon grand total yet: the required supply and AC source have not been qualified, several listings do not expose a stable price, and the inductor listings omit critical ratings. The directly observed Amazon prices (£52.99 for the supply candidate, £3.79 for adapter boards, and £6.79 for the film-capacitor pack) are planning references only, not an approved basket. The RS plan remains the complete qualified-price baseline at approximately £210-£240 before delivery.