# Project 05 - AC-DC Rectifiers and Power Supplies

### Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md
- 03_RLC_Circuits.md
- 04_MOSFET_Fundamentals.md
- 10_PWM_Motor_Control.md
- 12_P_Controller.md
- 13_PI_Controller.md
- 14_PID_Controller.md
- 08_Buck_Converter.md
- 15_Closed_Loop_Buck.md
- 09_Boost_Converter.md
- 07_DC_Chopper_Converters.md

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

## MATLAB Simulation

Before building the circuit, simulate all four rectifier configurations to predict the waveforms you will observe on the oscilloscope.

### Simulate All Four Configurations

```matlab
Vpeak = 10;          % set to match your signal generator output (V)
f     = 50;          % frequency (Hz)
R     = 1000;        % load resistance (Ohm)
t     = 0:0.0001:0.1;

v_ac       = Vpeak * sin(2*pi*f*t);
v_hw       = max(v_ac, 0);           % half-wave
v_fw       = abs(v_ac);              % full-wave

% RC smoothing: simulate capacitor discharge between peaks
dt = t(2) - t(1);
C1 = 100e-6; C2 = 470e-6;

v_fw_100 = zeros(size(v_fw)); v_fw_100(1) = v_fw(1);
v_fw_470 = zeros(size(v_fw)); v_fw_470(1) = v_fw(1);
for i = 2:length(t)
    v_fw_100(i) = max(v_fw(i), v_fw_100(i-1) * exp(-dt / (R*C1)));
    v_fw_470(i) = max(v_fw(i), v_fw_470(i-1) * exp(-dt / (R*C2)));
end

configs = {v_hw, v_fw, v_fw_100, v_fw_470};
titles  = {'Half-Wave', 'Full-Wave (no cap)', ...
           'Full-Wave + 100\muF', 'Full-Wave + 470\muF'};

figure;
for i = 1:4
    subplot(4,1,i);
    plot(t*1e3, configs{i}, 'b', 'LineWidth', 1.5); hold on;
    yline(mean(configs{i}), 'r--', sprintf('V_{avg}=%.2fV', mean(configs{i})));
    ripple = max(configs{i}) - min(configs{i});
    grid on; ylim([-1, Vpeak+2]);
    ylabel('V (V)');
    title(sprintf('%s  |  Ripple=%.2fV', titles{i}, ripple));
end
xlabel('Time (ms)');
sgtitle(sprintf('Rectifier Configurations - V_{peak}=%.0fV, f=%dHz', Vpeak, f));
```

### Calculate Theoretical Values

```matlab
Vpeak = 10;
Vf    = 0.7;          % diode forward voltage drop

V_hw_avg  = (Vpeak - Vf) / pi;
V_fw_avg  = 2*(Vpeak - 2*Vf) / pi;   % bridge: two diodes in series
V_rms_ac  = Vpeak / sqrt(2);

fprintf('AC RMS voltage:          %.2f V\n', V_rms_ac);
fprintf('Half-wave average Vdc:   %.2f V\n', V_hw_avg);
fprintf('Full-wave average Vdc:   %.2f V\n', V_fw_avg);
```

### Prediction Table

Set your signal generator to: **10 Vpeak, 50 Hz, sine wave**

| Configuration | Predicted V\_{avg} (V) | Predicted ripple |
|---------------|----------------------|-----------------|
| Half-wave | | |
| Full-wave | | |
| Full-wave + 100 µF | | |
| Full-wave + 470 µF | | |

---

## Components Required

- 4 × 1N4001–1N4007 diodes
- 100 µF electrolytic capacitor
- 470 µF electrolytic capacitor
- 1 kΩ load resistor
- Signal generator (AC source — set to 10 Vpeak, 50 Hz, sine)
- OWON HDS272S Oscilloscope (recommended)
- DSO Nano Oscilloscope (compatible)
- Multimeter
- Breadboard and jumper wires

---

## Safety Notice

```text
DO NOT CONNECT DIRECTLY TO MAINS VOLTAGE
```

For laboratory work use only:

- Low-voltage AC supplies
- Isolated function generators

---

## Experiment 1 - Measure AC Voltage

### Objective

Observe and measure the AC waveform from the signal generator before any rectification.

---

### Connections

```text
Probe Tip  ──────► Signal generator output (+)
Probe GND  ──────► Signal generator GND
```

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

| Parameter | Measured Value |
|-----------|---------------|
| Frequency | |
| Peak Voltage | |
| RMS Voltage | |

---

## Experiment 2 - Half-Wave Rectifier

### Objective

Observe half-wave rectification and measure the average DC output.

---

### Circuit Diagram

```text
Signal Generator (+)
    │
   1N4007 diode (anode toward signal generator)
    │
    ├──── Probe Tip
    │
   1 kΩ load resistor
    │
Signal Generator GND ──── Probe GND
```

---

### Step-by-Step Wiring

1. Insert the 1N4007 diode into the breadboard. The **anode** (unmarked end) connects toward the signal generator positive terminal. The **cathode** (banded end) connects toward the load.
2. Connect a jumper wire from the **signal generator (+)** to the **diode anode** row.
3. Insert the **1 kΩ resistor** so one leg is in the same row as the **diode cathode** and the other leg is in a new row.
4. Connect a jumper wire from the **bottom of the resistor** to the **signal generator GND**.
5. Connect the **oscilloscope probe tip** to the junction between the diode cathode and the resistor top.
6. Connect the **oscilloscope probe ground** to the signal generator GND.

---

### Wiring Checklist

Before applying power:

✅ Diode anode connected toward signal generator (+)

✅ Diode cathode connected toward load resistor

✅ Load resistor connected between diode cathode and GND

✅ Oscilloscope probe tip at diode cathode / resistor junction

✅ Oscilloscope probe ground connected to signal generator GND

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

| Parameter | Measured Value |
|-----------|---------------|
| Peak Voltage | |
| Average Voltage | |
| Frequency | |

---

## Experiment 3 - Bridge Rectifier

### Objective

Observe full-wave rectification using a bridge of four diodes.

---

### Circuit Diagram

```text
Signal Generator (+) ──── D1 anode
Signal Generator (−) ──── D3 anode

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
4. Connect the **signal generator (+)** to the AC(+) node and **(−)** to the AC(−) node.
5. Connect the **oscilloscope probe tip** to the DC(+) rail and **probe ground** to the DC(−) rail.

> Tip: The DC(−) rail is the common reference. Connect the signal generator GND and oscilloscope probe GND both to this point.

---

### Wiring Checklist

Before applying power:

✅ All four diodes oriented correctly (check anode/cathode markings)

✅ DC(+) rail connected to both D1 and D2 cathodes

✅ DC(−) rail connected to both D3 and D4 anodes

✅ Load resistor between DC(+) and DC(−)

✅ Oscilloscope probe tip at DC(+), probe GND at DC(−)

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

| Parameter | Measured Value |
|-----------|---------------|
| Peak Voltage | |
| Average Voltage | |
| Ripple Frequency | |

---

## Experiment 4 - Capacitor Smoothing

### Objective

Reduce ripple voltage by adding a smoothing capacitor across the bridge rectifier output.

---

### Step-by-Step Wiring

Keep the bridge rectifier from Experiment 3 intact.

1. Insert the **100 µF electrolytic capacitor** so its **positive leg** connects to the DC(+) rail and its **negative leg** connects to the DC(−) rail.
2. Verify capacitor polarity — the negative leg is marked with a stripe.
3. Connect the **oscilloscope probe tip** to the DC(+) rail and **probe ground** to DC(−).

---

### Wiring Checklist

Before applying power:

✅ Capacitor positive leg connected to DC(+) rail

✅ Capacitor negative leg connected to DC(−) rail

✅ Load resistor still connected in parallel with capacitor

✅ Oscilloscope probe tip at DC(+)

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

| Configuration | Ripple Voltage (V) |
|---------------|-------------------|
| Half-wave | |
| Full-wave | |
| Full-wave + 100 µF | |
| Full-wave + 470 µF | |

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
06_DC_AC_Inverters.md
```

Topics:

- H-Bridge Circuits
- MOSFET Switching
- Square-Wave Inverters
- PWM Inverters
- Sinusoidal PWM (SPWM)
- Generating AC from DC
