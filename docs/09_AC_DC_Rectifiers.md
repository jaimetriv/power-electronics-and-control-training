# Project 09 - AC-DC Rectifiers and Power Supplies

---

## Reading Before the Lab

Read _Fundamentals of Electric Circuits_ by Alexander and Sadiku, Chapters 9–10 for sinusoidal steady state and phasors, then Chapter 11 for AC power. Then read _Fundamentals of Power Electronics_ by Erickson and Maksimovic, Chapter 3, **Steady-State Converter Analysis**, for **diode rectifiers** and **capacitive filtering**. Sketch conduction intervals, estimate average DC output, and predict ripple before measuring.

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

The following average-value equations assume a sinusoidal source, a resistive load, ideal diodes unless a constant forward drop is included, and negligible source impedance. A capacitor-input supply has a different conduction pattern, discussed later in this lab.

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

With two diode drops in series (bridge rectifier), a rough high-input approximation is:

$$
V_{avg,FW} = \frac{2(V_{PEAK} - 2V_f)}{\pi}
$$

where $V_f \approx 0.7\ \text{V}$ per diode. This approximation does not model the shortened conduction interval near the zero crossings; a capacitor-input supply has a different waveform and average, treated separately below.

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

For a capacitor-input rectifier with approximately constant load current, a useful first estimate is:

$$
\Delta V \approx \frac{I_{LOAD}}{f_{RIPPLE}C}
$$

where $f_{RIPPLE}=f_{AC}$ for a half-wave rectifier and approximately $2f_{AC}$ for a full-wave rectifier. This is an approximation; diode resistance, source impedance, capacitor ESR, and conduction angle also affect the measured ripple.

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
| Resistor | Simscape → Electrical → Passives | 2 (source and load) |
| Voltage Sensor | Simscape → Electrical → Sensors | 1 |
| Electrical Reference | Simscape → Electrical → Electrical Elements | 1 |
| PS-Simulink Converter | Simscape → Utilities | 1 |
| Scope | Simulink → Sinks | 1 |
| Solver Configuration | Simscape → Utilities | 1 |

#### Step 3 — Set AC Voltage Source parameters

Double-click the AC Voltage Source block:

| Parameter | Value |
|-----------|-------|
| Peak amplitude | `8.5` V |
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

Configure the two Resistor blocks:

| Resistor | Resistance |
|----------|------------|
| Source resistor | `47` Ω |
| Load resistor | `1000` Ω |

#### Step 6 — Wire the half-wave circuit

Connect in series:

```text
AC Voltage Source (+) → 47 Ω source resistor → Diode (+) → Diode (−) → 1 kΩ load (p)
1 kΩ load (n) → AC Voltage Source (−) → Electrical Reference
```

Connect the Voltage Sensor across the Resistor:

```text
Voltage Sensor (+) → Resistor (p)
Voltage Sensor (−) → Resistor (n)
```

Connect the Solver Configuration to any node.

Connect: `Voltage Sensor (V) → PS-Simulink Converter → Scope`

#### Step 7 — Wiring checklist

✅ AC Voltage Source (+) passes through the 47 Ω source resistor to the Diode anode

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
| Resistor | Simscape → Electrical → Passives | 2 |
| Peak amplitude | `8.5` V |

#### Step 1 — Create a new Simulink model

1. In MATLAB, click **Home → New → Simulink Model**.
2. Save as `bridge_rectifier.slx`.

#### Step 2 — Add blocks

| Block | Library path | Quantity |
|-------|-------------|----------|
| AC Voltage Source | Simscape → Electrical → Sources | 1 |
| Diode | Simscape → Electrical → Semiconductors & Converters | 4 |
| Resistor | Simscape → Electrical → Passives | 2 (source and load) |
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
| Peak amplitude | `8.5` V |
| Frequency | `50` Hz |
| Phase shift | `0` deg |
| DC offset | `0` V |

All four Diodes:

| Parameter | Value |
|-----------|-------|
| Forward voltage | `0.7` V |
| On resistance | `0.01` Ω |

Source resistor: `47` Ω in series with one AC source lead.

Load resistor: `1000` Ω.

Capacitor: `100e-6` F (change to `470e-6` for the second test)

#### Step 4 — Wire the bridge circuit

Label four nodes for clarity: **AC+**, **AC−**, **DC+**, **DC−**.

```text
AC Voltage Source (+) → 47 Ω source resistor → AC+ node
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
Vpeak = 8.5;
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

The physical source is **6 V AC RMS**, approximately **8.5 V peak**, at 50 Hz. The Simscape models include a 47 Ω source resistor; the simple MATLAB waveform calculation is idealized and does not include diode drops or source resistance.

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

- 4 × 1N4007 diodes (1 A, 1000 V reverse rating; use all four for the bridge)
- 100 µF and 470 µF electrolytic capacitors, each rated at least 25 V
- 1 kΩ, 0.5 W load resistor
- 250 mA time-delay fuse and inline holder for one secondary lead; fuse rated at least 32 V
- 47 Ω, 5 W series resistor on one transformer secondary lead
- Enclosed, safety-approved plug-in AC adapter with isolated SELV output: 6 V AC RMS, 50 Hz, rated at least 250 mA (1.5 VA), overload protected, and no-load output no higher than 9 V AC RMS; students handle only insulated secondary leads
- Breadboard and jumper wires
- Multimeter
- OWON HDS272S oscilloscope and a 10:1 probe

---

## Safety Notice

```text
DO NOT CONNECT DIRECTLY TO MAINS VOLTAGE
```

For the physical build, use only the isolated 6 V AC output from the enclosed plug-in adapter specified above. Fit the 250 mA fuse and 47 Ω resistor in series with one secondary lead before connecting the rectifier. Students must not open the adapter or handle mains wiring. Do not use the OWON waveform generator to power the rectifier circuit unless its output voltage, current rating, and isolation have been verified from the instrument manual. Never connect any part of this circuit to mains.

---

## Experiment 1 - Measure AC Voltage
Measure the isolated 6 V AC adapter output before connecting the rectifier.

### Objective

Observe and measure the selected isolated AC source before any rectification.

---

### Connections

The specified source is **6 V AC RMS at 50 Hz**, approximately **8.5 V peak**. The Simscape source and MATLAB calculation should use 8.5 V peak. Measure the unloaded adapter output before wiring the rectifier; unregulated adapters may read higher than their rated voltage with no load.

1. Keep the adapter closed and use only its insulated low-voltage output leads.
2. Insert the **CH1 probe BNC** into CH1 on the oscilloscope.
3. Connect the **CH1 probe tip** to secondary lead A and the probe ground to secondary lead B.

```text
CH1 socket                  ◄──── BNC connector
Transformer secondary lead A ◄──── CH1 probe tip
Transformer secondary lead B ◄──── CH1 probe ground
```

> Confirm approximately 6 V RMS (8.5 V peak) at 50 Hz before adding any circuit components.

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
Transformer secondary A
    │
  250 mA fuse
    │
  47 Ω, 5 W series resistor
    │
  D1 1N4007 (anode)
  D1 cathode ──────── VOUT ─── CH1 tip
                         │
                    1 kΩ, 0.5 W
                         │
Transformer secondary B ─┴──── CH1 ground
```

Use separate breadboard rows for the source resistor, diode, VOUT junction, and load. Do not place both ends of a component into the same connected five-hole row.

---

### Step-by-Step Wiring

1. With the transformer disconnected, place D1 so its anode and banded cathode occupy separate breadboard rows.
2. Connect transformer secondary A through the 250 mA time-delay fuse and then the 47 Ω, 5 W resistor to D1's anode.
3. Connect D1's banded cathode to VOUT. Connect the 1 kΩ, 0.5 W load between VOUT and transformer secondary B.
4. Connect the CH1 probe tip to VOUT and the ground clip to secondary B. This source is isolated low voltage; do not use the setup with any mains-connected circuit.

---

### Wiring Checklist

Before applying power:

✅ Transformer secondary A connected through the 47 Ω series resistor to diode anode

✅ Diode cathode connected toward load resistor

✅ 1 kΩ load connected between diode cathode and secondary B

✅ CH1 probe tip at row 6 (VOUT = diode cathode / resistor top junction)

✅ CH1 probe ground at transformer secondary B

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
Transformer secondary A ── 250 mA fuse ── 47 Ω / 5 W ── AC(+)
Transformer secondary B ──────────────── AC(−)

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

1. With the transformer disconnected, insert all four 1N4007 diodes into the breadboard, each in a separate row.
2. Connect the bridge as follows:
   - **D1**: anode to AC(+), cathode to DC(+) rail
   - **D2**: anode to AC(−), cathode to DC(+) rail
   - **D3**: anode to DC(−) rail, cathode to AC(+)
   - **D4**: anode to DC(−) rail, cathode to AC(−)
3. Connect the **1 kΩ load resistor** between the DC(+) rail and the DC(−) rail.
4. Connect transformer secondary lead A through the **250 mA time-delay fuse** and **47 Ω, 5 W series resistor** to AC(+); connect secondary lead B directly to AC(−). Keep the adapter closed and use only its insulated output leads.
5. Hook the **CH1 probe tip** to the DC(+) rail. Clip the **CH1 probe ground** to the DC(−) rail. Keep the probe ground there for all bridge measurements.

> Tip: The transformer secondary is isolated and low voltage. Connect the oscilloscope probe ground to DC(−) only. Do not connect the scope ground to an AC bridge terminal while also grounding DC(−), and do not connect this circuit to mains.

---

### Wiring Checklist

Before applying power:

✅ All four diodes oriented correctly (check anode/cathode markings)

✅ DC(+) rail connected to both D1 and D2 cathodes

✅ DC(−) rail connected to both D3 and D4 anodes

✅ Load resistor between DC(+) and DC(−)

✅ Transformer secondary A reaches AC(+) through the 250 mA fuse and 47 Ω resistor; secondary B reaches AC(−)

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
Vpeak = 8.5; f = 50; R = 1000;
Vpeak = 8.5; f = 50; R = 1000;
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

✅ Isolated source set within its output rating; use the same measured peak voltage in predictions

✅ Diodes oriented correctly

✅ Load resistor connected

✅ Capacitor polarity verified

✅ Oscilloscope triggering correctly

✅ Probe ground at DC(−) rail

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

<div class="result-actions">
  <button class="result-export-btn" data-lab="lab09">⬇ Export Results (JSON)</button>
  <button class="result-clear-btn" data-lab="lab09">✕ Clear All Results</button>
</div>

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
