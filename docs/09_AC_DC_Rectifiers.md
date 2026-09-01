# Project 09 - AC-DC Rectifiers and Power Supplies

### Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md
- 03_RLC_Circuits.md
- 04_MOSFET_Fundamentals.md
- 05_DC_Chopper_Converters.md
- 06_Buck_Converter.md
- 07_Boost_Converter.md
- 08_PWM_Motor_Control.md

---

## Objective

In this project you will learn:

- The difference between AC and DC
- How diodes convert AC into DC
- Half-wave rectification
- Full-wave rectification
- Bridge rectifiers
- Smoothing capacitors
- Ripple voltage
- Basic power supply design

This project introduces one of the most important circuits in electronics:

```text
AC Power Supply
      ↓
  Rectifier
      ↓
   DC Power
```

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Explain AC and DC voltages

✅ Explain diode rectification

✅ Explain half-wave rectifiers

✅ Explain bridge rectifiers

✅ Measure ripple voltage

✅ Explain capacitor smoothing

✅ Understand basic DC power supplies

---

## Introduction

Most electrical distribution systems use:

```text
Alternating Current (AC)
```

Most electronic devices require:

```text
Direct Current (DC)
```

Therefore power conversion is required:

```text
AC → DC
```

This conversion process is called:

```text
Rectification
```

---

## What Is DC?

Direct current flows in a single direction.

Examples:

- Batteries
- USB supplies
- Microcontroller power rails

Typical waveform:

```text
Voltage

5V |--------------------
   |
0V +--------------------
          Time
```

---

## What Is AC?

Alternating current continuously changes polarity.

Typical waveform:

```text
Voltage

 +V       /\
         /  \
 0V ----/----\----/----
       /      \  /
 -V   /        \/
```

The voltage repeatedly becomes positive and negative.

---

## AC Frequency

AC voltage repeats periodically.

| Region | Frequency |
|--------|-----------|
| Europe | 50 Hz |
| North America | 60 Hz |

---

## RMS Voltage Derivation

The RMS value is defined as the square root of the mean of the squared signal over one period.

For a sinusoid $v(t) = V_{PEAK}\sin(\omega t)$:

$$
V_{RMS} = \sqrt{\frac{1}{T}\int_0^T v(t)^2\,dt}
$$

Substituting and using the identity $\sin^2(\omega t) = \frac{1 - \cos(2\omega t)}{2}$:

$$
V_{RMS} = \sqrt{\frac{V_{PEAK}^2}{T}\int_0^T \frac{1 - \cos(2\omega t)}{2}\,dt}
$$

The cosine term integrates to zero over a full period, leaving:

$$
V_{RMS} = \sqrt{\frac{V_{PEAK}^2}{2}} = \frac{V_{PEAK}}{\sqrt{2}}
$$

$$
\boxed{V_{RMS} = \frac{V_{PEAK}}{\sqrt{2}}}
$$

---

## Average DC Output Derivation

### Half-Wave Rectifier

Only the positive half-cycle conducts. The average over a full period is:

$$
V_{avg} = \frac{1}{2\pi}\int_0^{\pi} V_{PEAK}\sin(\theta)\,d\theta
$$

$$
V_{avg} = \frac{V_{PEAK}}{2\pi}\Big[-\cos(\theta)\Big]_0^{\pi} = \frac{V_{PEAK}}{2\pi}(1 - (-1))
$$

$$
\boxed{V_{avg,HW} = \frac{V_{PEAK}}{\pi} \approx 0.318\,V_{PEAK}}
$$

### Full-Wave Bridge Rectifier

Both half-cycles are rectified. The average over a full period is:

$$
V_{avg} = \frac{2}{2\pi}\int_0^{\pi} V_{PEAK}\sin(\theta)\,d\theta = \frac{2V_{PEAK}}{\pi}
$$

$$
\boxed{V_{avg,FW} = \frac{2V_{PEAK}}{\pi} \approx 0.637\,V_{PEAK}}
$$

With two diode drops in series (bridge rectifier), the practical value is:

$$
V_{avg,FW} = \frac{2(V_{PEAK} - 2V_f)}{\pi}
$$

where $V_f \approx 0.7\ \text{V}$ per diode.

---

## RMS Voltage

AC voltages are normally specified using the RMS value.

For a sinewave:

$$
V_{RMS} = \frac{V_{PEAK}}{\sqrt{2}}
$$

### Example

Given:

$$
V_{PEAK} = 10\ \text{V}
$$

Then:

$$
V_{RMS} = \frac{10}{1.414} \approx 7.07\ \text{V}
$$

---

## Review of Diodes

A diode allows current flow in one direction only.

Symbol:

```text
---->|----
```

When forward biased: current flows.

When reverse biased: current is blocked.

---

## Why Diodes Can Rectify AC

Because a diode blocks current in one direction, it removes portions of an AC waveform, converting:

```text
Alternating Voltage  →  Pulsating DC Voltage
```

---

## Half-Wave Rectifier

The simplest rectifier uses one diode.

### Circuit Diagram

```text
AC Source
    │
   Diode (anode toward AC source)
    │
   Load resistor
    │
   GND
```

### Half-Wave Operation

Positive half-cycle: the diode conducts and output voltage appears across the load.

Negative half-cycle: the diode blocks current and output voltage is approximately zero.

### Half-Wave Output

Input:

```text
      /\      /\
     /  \    /  \
____/    \__/    \____
```

Output:

```text
      /\      /\
     /  \    /  \
____/    \__/    \____

______________________
```

Negative portions are removed.

---

## Limitations of Half-Wave Rectification

- Large ripple
- Low efficiency
- Lower average DC voltage

---

## Full-Wave Rectification

A better approach uses both halves of the AC waveform via a bridge rectifier containing four diodes.

### Full-Wave Output

Input:

```text
      /\      /\
     /  \    /  \
____/    \__/    \____
```

Output:

```text
     /\      /\      /\
    /  \    /  \    /  \
___/    \__/    \__/    \___
```

Negative half-cycles are inverted, so the output remains positive throughout.

---

## Advantages of Full-Wave Rectification

✅ Higher average voltage

✅ Lower ripple

✅ Better efficiency

✅ Better utilisation of the AC source

---

## Capacitor Smoothing

The output of a bridge rectifier is not pure DC.

Adding a capacitor across the output reduces ripple.

When the rectified voltage rises the capacitor charges.

When the rectified voltage falls the capacitor discharges into the load, keeping the output voltage more stable.

---

## Output Without Capacitor

```text
     /\      /\      /\
    /  \    /  \    /  \
___/    \__/    \__/    \___
```

## Output With Capacitor

```text
────────────────────────────
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

The average voltage becomes smoother.

---

## Ripple Voltage

Ripple voltage is the small AC variation remaining on a DC output.

Ripple increases when load current increases or capacitance decreases.

Ripple decreases when capacitance increases, load current decreases, or ripple frequency increases.

---

## Simulink / Simscape Simulation

Before building the circuit, simulate all four rectifier configurations in Simscape to predict the waveforms you will observe on the oscilloscope.

You will build two models:

- **Model 1** — Half-wave rectifier (one diode)
- **Model 2** — Bridge rectifier with optional smoothing capacitor

---

### Model 1 — Half-Wave Rectifier

#### Step 1 — Create a new Simulink model

1. In MATLAB, click **Home → New → Simulink Model**.
2. Save as `half_wave_rectifier.slx`.

#### Step 2 — Add blocks

| Block | Library path | Quantity |
|-------|-------------|----------|
| AC Voltage Source | Simscape → Electrical → Sources | 1 |
| Diode | Simscape → Electrical → Semiconductors & Converters | 1 |
| Resistor | Simscape → Electrical → Passives | 1 |
| Voltage Sensor | Simscape → Electrical → Sensors | 1 |
| Electrical Reference | Simscape → Electrical → Electrical Elements | 1 |
| PS-Simulink Converter | Simscape → Utilities | 1 |
| Scope | Simulink → Sinks | 1 |
| Solver Configuration | Simscape → Utilities | 1 |

#### Step 3 — Set AC Voltage Source parameters

Double-click the AC Voltage Source block:

| Parameter | Value |
|-----------|-------|
| Peak amplitude | `10` V |
| Phase shift | `0` deg |
| Frequency | `50` Hz |
| DC offset | `0` V |

#### Step 4 — Set Diode parameters

Double-click the Diode block:

| Parameter | Value |
|-----------|-------|
| Forward voltage | `0.7` V |
| On resistance | `0.01` Ω |

#### Step 5 — Set Resistor parameter

| Parameter | Value |
|-----------|-------|
| Resistance | `1000` Ω |

#### Step 6 — Wire the half-wave circuit

Connect in series:

```text
AC Voltage Source (+) → Diode (+) → Diode (−) → Resistor (p)
Resistor (n) → AC Voltage Source (−) → Electrical Reference
```

Connect the Voltage Sensor across the Resistor:

```text
Voltage Sensor (+) → Resistor (p)
Voltage Sensor (−) → Resistor (n)
```

Connect the Solver Configuration to any node.

Connect: `Voltage Sensor (V) → PS-Simulink Converter → Scope`

#### Step 7 — Wiring checklist

✅ AC Voltage Source (+) to Diode anode (+)

✅ Diode cathode (−) to Resistor (p)

✅ Resistor (n) to AC Voltage Source (−) and Electrical Reference

✅ Voltage Sensor across Resistor

✅ Solver Configuration connected to any node

✅ PS-Simulink Converter between Voltage Sensor output and Scope

#### Step 8 — Configure simulation settings

1. Open **Modeling → Model Settings**.
2. Set **Solver** to `ode23t`.
3. Set **Stop time** to `0.1` s.
4. Set **Max step size** to `1e-4`.

#### Step 9 — Run and observe

Click **Run**. The Scope should show:

```text
      /\      /\
     /  \    /  \
____/    \__/    \____
```

Only positive half-cycles appear. Negative half-cycles are blocked by the diode.

---

### Model 2 — Bridge Rectifier with Smoothing Capacitor

#### Step 1 — Create a new Simulink model

1. In MATLAB, click **Home → New → Simulink Model**.
2. Save as `bridge_rectifier.slx`.

#### Step 2 — Add blocks

| Block | Library path | Quantity |
|-------|-------------|----------|
| AC Voltage Source | Simscape → Electrical → Sources | 1 |
| Diode | Simscape → Electrical → Semiconductors & Converters | 4 |
| Resistor | Simscape → Electrical → Passives | 1 |
| Capacitor | Simscape → Electrical → Passives | 1 |
| Voltage Sensor | Simscape → Electrical → Sensors | 1 |
| Electrical Reference | Simscape → Electrical → Electrical Elements | 1 |
| PS-Simulink Converter | Simscape → Utilities | 1 |
| Scope | Simulink → Sinks | 1 |
| Solver Configuration | Simscape → Utilities | 1 |

#### Step 3 — Set block parameters

AC Voltage Source:

| Parameter | Value |
|-----------|-------|
| Peak amplitude | `10` V |
| Frequency | `50` Hz |
| Phase shift | `0` deg |
| DC offset | `0` V |

All four Diodes:

| Parameter | Value |
|-----------|-------|
| Forward voltage | `0.7` V |
| On resistance | `0.01` Ω |

Resistor: `1000` Ω

Capacitor: `100e-6` F (change to `470e-6` for the second test)

#### Step 4 — Wire the bridge circuit

Label four nodes for clarity: **AC+**, **AC−**, **DC+**, **DC−**.

```text
AC Voltage Source (+) → AC+ node
AC Voltage Source (−) → AC− node

D1: anode → AC+,  cathode → DC+
D2: anode → AC−,  cathode → DC+
D3: anode → DC−,  cathode → AC+
D4: anode → DC−,  cathode → AC−

Resistor (p) → DC+
Resistor (n) → DC−

Capacitor (p) → DC+
Capacitor (n) → DC−

Electrical Reference → DC−
```

Connect the Voltage Sensor across the load:

```text
Voltage Sensor (+) → DC+
Voltage Sensor (−) → DC−
```

Connect the Solver Configuration to any node.

Connect: `Voltage Sensor (V) → PS-Simulink Converter → Scope`

#### Step 5 — Wiring checklist

✅ D1 anode at AC+, cathode at DC+

✅ D2 anode at AC−, cathode at DC+

✅ D3 anode at DC−, cathode at AC+

✅ D4 anode at DC−, cathode at AC−

✅ Resistor between DC+ and DC−

✅ Capacitor between DC+ and DC− (observe polarity: p → DC+)

✅ Electrical Reference at DC−

✅ Voltage Sensor across DC+ / DC−

✅ Solver Configuration connected to any node

#### Step 6 — Configure simulation settings

1. Open **Modeling → Model Settings**.
2. Set **Solver** to `ode23t`.
3. Set **Stop time** to `0.1` s.
4. Set **Max step size** to `1e-4`.

#### Step 7 — Run: full-wave without capacitor

Set Capacitor value to a very small value (`1e-9` F) to effectively remove it, then run.

Expected output:

```text
     /\      /\      /\
    /  \    /  \    /  \
___/    \__/    \__/    \___
```

Both half-cycles appear, rectified to positive. Ripple frequency = 100 Hz (twice the input).

#### Step 8 — Run: full-wave with 100 µF capacitor

Set Capacitor to `100e-6` F and run.

Expected output: smoother waveform with reduced ripple.

#### Step 9 — Run: full-wave with 470 µF capacitor

Set Capacitor to `470e-6` F and run.

Expected output: further reduced ripple compared to 100 µF.

---

### Prediction Table

Run the MATLAB script below to calculate theoretical values, then complete the table before doing the hardware experiments.

```matlab
Vpeak = 10;
Vf    = 0.7;          % diode forward voltage drop
f     = 50;
R     = 1000;

V_hw_avg = (Vpeak - Vf) / pi;
V_fw_avg = 2*(Vpeak - 2*Vf) / pi;   % bridge: two diodes in series

C1 = 100e-6; C2 = 470e-6;
Vripple_100 = (Vpeak - 2*Vf) / (2*f*R*C1);
Vripple_470 = (Vpeak - 2*Vf) / (2*f*R*C2);

fprintf('Half-wave Vavg:          %.2f V\n', V_hw_avg);
fprintf('Full-wave Vavg:          %.2f V\n', V_fw_avg);
fprintf('Ripple with 100 uF:      %.2f V\n', Vripple_100);
fprintf('Ripple with 470 uF:      %.2f V\n', Vripple_470);
```

Set the OWON HDS272S waveform generator to: **10 Vpeak, 50 Hz, sine wave**

<div class="result-block">
<table>
  <thead><tr><th>Configuration</th><th>Predicted V<sub>avg</sub> (V)</th><th>Predicted ripple (V)</th></tr></thead>
  <tbody>
    <tr><td>Half-wave</td><td><input class="result-input" id="lab09-sim-vavg-hw" placeholder="V"></td><td><input class="result-input" id="lab09-sim-ripple-hw" placeholder="V"></td></tr>
    <tr><td>Full-wave</td><td><input class="result-input" id="lab09-sim-vavg-fw" placeholder="V"></td><td><input class="result-input" id="lab09-sim-ripple-fw" placeholder="V"></td></tr>
    <tr><td>Full-wave + 100 µF</td><td><input class="result-input" id="lab09-sim-vavg-fw100" placeholder="V"></td><td><input class="result-input" id="lab09-sim-ripple-fw100" placeholder="V"></td></tr>
    <tr><td>Full-wave + 470 µF</td><td><input class="result-input" id="lab09-sim-vavg-fw470" placeholder="V"></td><td><input class="result-input" id="lab09-sim-ripple-fw470" placeholder="V"></td></tr>
  </tbody>
</table>
</div>

---

## Components Required

- 4 × 1N4001–1N4007 diodes
- 100 µF electrolytic capacitor
- 470 µF electrolytic capacitor
- 1 kΩ load resistor
- OWON HDS272S Oscilloscope with built-in waveform generator (AC source — set to 10 Vpeak, 50 Hz, sine)
- DSO Nano Oscilloscope (compatible, requires separate signal generator)
- Multimeter
- Breadboard and jumper wires

---

## Safety Notice

```text
DO NOT CONNECT DIRECTLY TO MAINS VOLTAGE
```

For laboratory work use only the OWON HDS272S built-in waveform generator output or another isolated low-voltage AC source.

---

## Experiment 1 - Measure AC Voltage

### Objective

Observe and measure the AC waveform from the OWON HDS272S waveform generator before any rectification.

---

### Connections

> Set the OWON HDS272S waveform generator to **10 Vpeak, 50 Hz, sine** before connecting.

1. Insert the **CH1 probe BNC** into CH1 on the OWON HDS272S.
2. Hook the **CH1 probe tip** to the **GEN OUT terminal** on the OWON HDS272S.
3. Clip the **CH1 probe ground** to the **GEN GND terminal**.

```text
CH1 socket  ◄──── BNC connector
GEN OUT     ◄──── CH1 probe tip
GEN GND     ◄──── CH1 probe ground
```

> Verifying the generator output before adding any circuit components avoids wiring errors.

---

### Oscilloscope Settings

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 2 V/div | 2 V/div |
| Horizontal scale | 5 ms/div | 5 ms/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | AC | AC |

---

### Expected Waveform

```text
      /\
     /  \
----/----\----
   /      \
  /        \
```

---

### Record Measurements

<div class="result-block">
<table>
  <thead><tr><th>Parameter</th><th>Measured Value</th></tr></thead>
  <tbody>
    <tr><td>Frequency</td><td><input class="result-input" id="lab09-exp1-freq" placeholder="Hz"></td></tr>
    <tr><td>Peak Voltage</td><td><input class="result-input" id="lab09-exp1-vpeak" placeholder="V"></td></tr>
    <tr><td>RMS Voltage</td><td><input class="result-input" id="lab09-exp1-vrms" placeholder="V"></td></tr>
  </tbody>
</table>
</div>

---

## Experiment 2 - Half-Wave Rectifier

### Objective

Observe half-wave rectification and measure the average DC output.

---

### Circuit Diagram

```text
OWON HDS272S waveform generator (+)
    │
   1N4007 diode (anode toward waveform generator)
    │
    ├──── Probe Tip
    │
   1 kΩ load resistor
    │
OWON HDS272S waveform generator GND ──── Probe GND
```

---

### Breadboard Layout

```
       a      b      c      d      e
     ┌─────────────────────────────────────┐
 4   │ [●]   [ ]   [ ]   [ ]   [A]       │ ← GEN OUT → a4, Diode anode e4  (same row)
 5   │ [ ]   [ ]   [ ]   [ ]   [│]       │  1N4007 diode body
 6   │ [ ]   [ ]   [┐]   [ ]   [K]       │ ← Diode cathode e6 = Resistor top c6 = VOUT  (same row)
 7   │ [ ]   [ ]   [│]   [ ]   [ ]       │  1 kΩ resistor body
 8   │ [●]   [ ]   [┘]   [ ]   [ ]       │ ← GEN GND → a8, Resistor bottom c8  (same row)
     └─────────────────────────────────────┘
```

`[A]` = anode (unmarked end); `[K]` = cathode (banded end). Current flows A → K.

Row 6 is the **VOUT junction** (diode cathode e6 and resistor top c6 share the same row — no jumper needed).

---

### Step-by-Step Wiring

1. Insert the **1N4007 diode** vertically: **anode** (unmarked end) in **row 4, column e**, **cathode** (banded end) in **row 6, column e**.
2. Connect a jumper wire from the **OWON GEN OUT terminal** to **row 4, column a** (same row as diode anode).
3. Insert the **1 kΩ resistor** vertically: one leg in **row 6, column c**, other in **row 8, column c**. Row 6 connects to the diode cathode (same row = VOUT junction).
4. Connect a jumper wire from the **OWON GEN GND terminal** to **row 8, column a** (same row as resistor bottom).
5. Hook the **CH1 probe tip** to any hole in **row 6** (VOUT junction).
6. Clip the **CH1 probe ground** to **row 8** or directly to the GEN GND terminal.

---

### Wiring Checklist

Before applying power:

✅ Diode anode connected toward signal generator (+)

✅ Diode cathode connected toward load resistor

✅ Load resistor connected between diode cathode and GND

✅ CH1 probe tip at row 6 (VOUT = diode cathode / resistor top junction)

✅ CH1 probe ground at row 8 or GEN GND terminal

---

### Oscilloscope Settings

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 2 V/div | 2 V/div |
| Horizontal scale | 5 ms/div | 5 ms/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Expected Output

```text
      /\      /\
     /  \    /  \
____/    \__/    \____

______________________
```

---

### Record Measurements

<div class="result-block">
<table>
  <thead><tr><th>Parameter</th><th>Measured Value</th></tr></thead>
  <tbody>
    <tr><td>Peak Voltage</td><td><input class="result-input" id="lab09-exp2-vpeak" placeholder="V"></td></tr>
    <tr><td>Average Voltage</td><td><input class="result-input" id="lab09-exp2-vavg" placeholder="V"></td></tr>
    <tr><td>Frequency</td><td><input class="result-input" id="lab09-exp2-freq" placeholder="Hz"></td></tr>
  </tbody>
</table>
</div>

---

## Experiment 3 - Bridge Rectifier

### Objective

Observe full-wave rectification using a bridge of four diodes.

---

### Circuit Diagram

```text
OWON HDS272S waveform generator (+) ──── D1 anode
OWON HDS272S waveform generator (−) ──── D3 anode

D1 cathode ──┬── D2 cathode ──── DC (+) output
             │
           Load (1 kΩ)
             │
D2 anode  ──┴── D4 anode  ──── DC (−) / GND

D3 cathode ──── DC (+) output
D4 cathode ──── DC (−) / GND
```

The standard bridge arrangement:

```text
        AC (+)
           │
      D1 ──┤── D3
           │
    DC(+) ─┤
           │
      D4 ──┤── D2
           │
        AC (−)
```

---

### Step-by-Step Wiring

1. Insert all four 1N4007 diodes into the breadboard, each in a separate row.
2. Connect the bridge as follows:
   - **D1**: anode to AC(+), cathode to DC(+) rail
   - **D2**: anode to AC(−), cathode to DC(+) rail
   - **D3**: anode to DC(−) rail, cathode to AC(+)
   - **D4**: anode to DC(−) rail, cathode to AC(−)
3. Connect the **1 kΩ load resistor** between the DC(+) rail and the DC(−) rail.
4. Connect the **OWON HDS272S waveform generator (+)** to the AC(+) node and **(−)** to the AC(−) node.
5. Hook the **CH1 probe tip** to the DC(+) rail. Clip the **CH1 probe ground** to the DC(−) rail.

> Tip: The DC(−) rail is the common reference. Connect the waveform generator GND and oscilloscope probe GND both to this point.

---

### Wiring Checklist

Before applying power:

✅ All four diodes oriented correctly (check anode/cathode markings)

✅ DC(+) rail connected to both D1 and D2 cathodes

✅ DC(−) rail connected to both D3 and D4 anodes

✅ Load resistor between DC(+) and DC(−)

✅ CH1 probe tip at DC(+), CH1 probe ground at DC(−)

---

### Oscilloscope Settings

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 2 V/div | 2 V/div |
| Horizontal scale | 5 ms/div | 5 ms/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Expected Output

```text
     /\      /\      /\
    /  \    /  \    /  \
___/    \__/    \__/    \___
```

---

### Record Measurements

<div class="result-block">
<table>
  <thead><tr><th>Parameter</th><th>Measured Value</th></tr></thead>
  <tbody>
    <tr><td>Peak Voltage</td><td><input class="result-input" id="lab09-exp3-vpeak" placeholder="V"></td></tr>
    <tr><td>Average Voltage</td><td><input class="result-input" id="lab09-exp3-vavg" placeholder="V"></td></tr>
    <tr><td>Ripple Frequency</td><td><input class="result-input" id="lab09-exp3-freq" placeholder="Hz"></td></tr>
  </tbody>
</table>
</div>

---

## Experiment 4 - Capacitor Smoothing

### Objective

Reduce ripple voltage by adding a smoothing capacitor across the bridge rectifier output.

---

### Step-by-Step Wiring

Keep the bridge rectifier from Experiment 3 intact.

1. Insert the **100 µF electrolytic capacitor** so its **positive leg** connects to the DC(+) rail and its **negative leg** connects to the DC(−) rail.
2. Verify capacitor polarity — the negative leg is marked with a stripe.
3. Hook the **CH1 probe tip** to the DC(+) rail. Clip the **CH1 probe ground** to DC(−).

---

### Wiring Checklist

Before applying power:

✅ Capacitor positive leg connected to DC(+) rail

✅ Capacitor negative leg connected to DC(−) rail

✅ Load resistor still connected in parallel with capacitor

✅ CH1 probe tip at DC(+), CH1 probe ground at DC(−)

---

### Oscilloscope Settings — Ripple Measurement

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 500 mV/div | 500 mV/div |
| Horizontal scale | 5 ms/div | 5 ms/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | AC | AC |

> Switch to AC coupling to zoom in on the ripple while ignoring the DC offset.

---

### Observe

Compare the output with and without the capacitor.

With the capacitor the output should be much smoother.

Then replace the 100 µF capacitor with the **470 µF** capacitor and observe the further reduction in ripple.

---

### Results Table

<div class="result-block">
<table>
  <thead><tr><th>Configuration</th><th>Ripple Voltage (V)</th></tr></thead>
  <tbody>
    <tr><td>Half-wave</td><td><input class="result-input" id="lab09-exp4-ripple-hw" placeholder="V"></td></tr>
    <tr><td>Full-wave</td><td><input class="result-input" id="lab09-exp4-ripple-fw" placeholder="V"></td></tr>
    <tr><td>Full-wave + 100 µF</td><td><input class="result-input" id="lab09-exp4-ripple-fw100" placeholder="V"></td></tr>
    <tr><td>Full-wave + 470 µF</td><td><input class="result-input" id="lab09-exp4-ripple-fw470" placeholder="V"></td></tr>
  </tbody>
</table>
</div>

---

## MATLAB Comparison

Now overlay your measured waveform parameters against the simulated predictions.

```matlab
Vpeak = 10; f = 50; R = 1000;
t = 0:0.0001:0.1;
v_ac = Vpeak * sin(2*pi*f*t);
v_fw = abs(v_ac);

dt = t(2) - t(1);
v_fw_100 = zeros(size(v_fw)); v_fw_100(1) = v_fw(1);
v_fw_470 = zeros(size(v_fw)); v_fw_470(1) = v_fw(1);
for i = 2:length(t)
    v_fw_100(i) = max(v_fw(i), v_fw_100(i-1) * exp(-dt / (R*100e-6)));
    v_fw_470(i) = max(v_fw(i), v_fw_470(i-1) * exp(-dt / (R*470e-6)));
end

% Your measured values — replace zeros
Vavg_measured   = [0.0, 0.0, 0.0, 0.0];   % (V) half-wave, FW, FW+100uF, FW+470uF
ripple_measured = [0.0, 0.0, 0.0, 0.0];   % (V) peak-to-peak ripple

configs   = {max(v_ac,0), v_fw, v_fw_100, v_fw_470};
labels    = {'Half-Wave','Full-Wave','FW+100\muF','FW+470\muF'};

Vavg_sim = cellfun(@mean, configs);

figure;
subplot(2,1,1);
x = 1:4;
bar(x, [Vavg_sim; Vavg_measured]', 0.6);
set(gca,'XTickLabel', labels);
legend('Simulated','Measured','Location','northwest');
ylabel('Average Voltage (V)'); grid on;
title('Average DC Voltage - Simulation vs Measurement');

ripple_sim = cellfun(@(v) max(v)-min(v), configs);
subplot(2,1,2);
bar(x, [ripple_sim; ripple_measured]', 0.6);
set(gca,'XTickLabel', labels);
legend('Simulated','Measured','Location','northeast');
ylabel('Ripple Voltage (V)'); grid on;
title('Ripple Voltage - Simulation vs Measurement');
```

### Reflection

- Does increasing capacitance from 100 µF to 470 µF reduce ripple by the ratio you expected (470/100 ≈ 4.7×)?
- The bridge rectifier uses two diodes in series per half-cycle. How does this affect the measured average voltage compared to the simulation which assumed ideal diodes?
- How does the ripple frequency of the full-wave rectifier compare to the input frequency, and why?

---

## Troubleshooting

### No Output Voltage

Check:

✅ Diode polarity (banded end = cathode)

✅ Signal generator connected and outputting

✅ Load resistor connected

---

### Excessive Ripple

Check:

✅ Capacitor value

✅ Capacitor polarity (positive leg to DC(+))

✅ Load current not too high

---

### Incorrect Waveform

Check:

✅ Oscilloscope trigger settings

✅ Probe ground connected to DC(−) rail

✅ Horizontal time scale appropriate for 50 Hz (5 ms/div shows two cycles)

---

### Troubleshooting Checklist

✅ Signal generator connected and set to 10 Vpeak, 50 Hz, sine

> Use the OWON HDS272S built-in waveform generator output.

✅ Diodes oriented correctly

✅ Load resistor connected

✅ Capacitor polarity verified

✅ Oscilloscope triggering correctly

✅ Probe ground at DC(−) rail

---

<div class="result-actions">
  <button class="result-export-btn" data-lab="lab09">⬇ Export Results (JSON)</button>
  <button class="result-clear-btn" data-lab="lab09">✕ Clear All Results</button>
</div>

---

## Knowledge Check

### Question 1

What is rectification?

---

### Question 2

What does a diode do?

---

### Question 3

Why is a bridge rectifier better than a half-wave rectifier?

---

### Question 4

What is ripple voltage?

---

### Question 5

Why is a smoothing capacitor used?

---

### Question 6

A full-wave rectifier with a 100 µF capacitor produces 2 V of ripple at 50 Hz with a 1 kΩ load. Estimate the ripple if the capacitor is replaced with 470 µF, using the approximation $V_{ripple} \approx I_{load} / (f_{ripple} \times C)$. Show your working.

---

## Project Summary

In this project you learned:

✅ AC and DC fundamentals

✅ Diode operation

✅ Half-wave rectification

✅ Full-wave rectification

✅ Bridge rectifiers

✅ Ripple voltage

✅ Capacitor smoothing

✅ Power supply fundamentals

---

## Next Project

```text
10_DC_AC_Inverters.md
```


Topics:

- H-Bridge Circuits
- MOSFET Switching
- Square-Wave Inverters
- PWM Inverters
- Sinusoidal PWM (SPWM)
- Generating AC from DC
