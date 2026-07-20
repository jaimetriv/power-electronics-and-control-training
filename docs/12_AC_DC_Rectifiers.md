# Project 12 - AC-DC Rectifiers and Power Supplies

## Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md
- 03_RLC_Circuits.md
- 04_MOSFET_Fundamentals.md
- 05_PWM_Motor_Control.md
- 06_P_Controller.md
- 07_PI_Controller.md
- 08_PID_Controller.md
- 09_Buck_Converter.md
- 10_Closed_Loop_Buck.md
- 11_Boost_Converter.md
- 11B_DC_Chopper_Converters.md

---

# Objective

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

# Learning Outcomes

At the end of this project you should be able to:

✅ Explain AC and DC voltages

✅ Explain diode rectification

✅ Explain half-wave rectifiers

✅ Explain bridge rectifiers

✅ Measure ripple voltage

✅ Explain capacitor smoothing

✅ Understand basic DC power supplies

---

# Introduction

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
AC
↓
DC
```

This conversion process is called:

```text
Rectification
```

---

# What Is DC?

Direct current flows in a single direction.

Examples:

- Batteries
- USB supplies
- Arduino power rails

Typical waveform:

```text
Voltage

5V |--------------------
   |
0V +--------------------
           Time
```

---

# What Is AC?

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

# AC Frequency

AC voltage repeats periodically.

Examples:

| Region | Frequency |
|----------|----------|
| Europe | 50 Hz |
| North America | 60 Hz |

---

# RMS Voltage

AC voltages are normally specified using the RMS value.

For a sinewave:

$$
V_{RMS}
=
\frac{V_{PEAK}}{\sqrt{2}}
$$

---

# Example

Given:

$$
V_{PEAK}=10V
$$

Then:

$$
V_{RMS}
=
\frac{10}{1.414}
$$

$$
V_{RMS}
\approx 7.07V
$$

---

# Review of Diodes

A diode allows current flow in one direction.

Symbol:

```text
---->|----
```

---

# Forward Bias

When forward biased:

```text
Current Flows
```

---

# Reverse Bias

When reverse biased:

```text
Current Is Blocked
```

---

# Why Diodes Can Rectify AC

Because a diode blocks current in one direction, it can remove portions of an AC waveform.

This converts:

```text
Alternating Voltage
```

into:

```text
Pulsating DC Voltage
```

---

# Half-Wave Rectifier

The simplest rectifier uses:

```text
One Diode
```

---

# Circuit

```mermaid
graph LR

A[AC Source]
--> B[Diode]

B --> C[Load]

C --> D[Ground]
```

---

# Half-Wave Operation

## Positive Half-Cycle

The diode conducts.

Output voltage appears across the load.

---

## Negative Half-Cycle

The diode blocks current.

Output voltage becomes approximately zero.

---

# Half-Wave Output

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

# Limitations of Half-Wave Rectification

Disadvantages:

- Large ripple
- Low efficiency
- Lower average DC voltage

---

# Full-Wave Rectification

A better approach uses both halves of the AC waveform.

This is achieved using:

```text
Bridge Rectifier
```

---

# Bridge Rectifier

A bridge rectifier contains:

```text
Four Diodes
```

arranged in a bridge configuration.

---

# Simplified Block Diagram

```mermaid
graph LR

A[AC Input]
--> B[Bridge Rectifier]

B --> C[DC Output]
```

---

# Full-Wave Operation

Negative half cycles are inverted.

The output remains positive during both halves of the AC cycle.

---

# Full-Wave Output

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

---

# Advantages of Full-Wave Rectification

✅ Higher average voltage

✅ Lower ripple

✅ Better efficiency

✅ Better utilization of the AC source

---

# Capacitor Smoothing

The output of a bridge rectifier is not pure DC.

A capacitor is added across the output.

---

# Smoothing Capacitor Circuit

```mermaid
graph LR

A[Bridge Rectifier]
--> B[DC Output]

B --> C[100 µF Capacitor]

B --> D[Load]
```

---

# How the Capacitor Works

When the rectified voltage rises:

```text
Capacitor Charges
```

When the rectified voltage falls:

```text
Capacitor Discharges
```

The capacitor supplies energy to the load and helps keep the output voltage stable.

---

# Output Without Capacitor

```text
     /\      /\      /\
    /  \    /  \    /  \
___/    \__/    \__/    \___
```

---

# Output With Capacitor

```text
───────────────
~~~~~~~~~~~~~~~
───────────────
```

The average voltage becomes smoother.

---

# Ripple Voltage

Ripple voltage is the small AC variation remaining on a DC output.

Ideal output:

```text
Perfect DC
```

Practical output:

```text
DC + Ripple
```

---

# Factors Affecting Ripple

Ripple increases when:

- Load current increases
- Capacitance decreases

Ripple decreases when:

- Capacitance increases
- Load current decreases
- Ripple frequency increases

---

# MATLAB Simulation

Before building the circuit, simulate all four rectifier configurations to predict the waveforms you will observe on the DSO Nano.

## Simulate All Four Configurations

```matlab
Vpeak = 10;          % set to match your signal generator output (V)
f     = 50;          % frequency (Hz)
R     = 1000;        % load resistance (Ohm)
t     = 0:0.0001:0.1;

v_ac       = Vpeak * sin(2*pi*f*t);
v_hw       = max(v_ac, 0);           % half-wave
v_fw       = abs(v_ac);              % full-wave

% RC smoothing: simulate capacitor discharge between peaks
function v_smooth = smooth_rc(v_rect, t, R, C)
    v_smooth = zeros(size(v_rect));
    v_smooth(1) = v_rect(1);
    dt = t(2) - t(1);
    for i = 2:length(t)
        v_discharge = v_smooth(i-1) * exp(-dt / (R*C));
        v_smooth(i) = max(v_rect(i), v_discharge);
    end
end

v_fw_100  = smooth_rc(v_fw, t, R, 100e-6);
v_fw_470  = smooth_rc(v_fw, t, R, 470e-6);

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
sgtitle(sprintf('Rectifier Configurations \mdash V_{peak}=%.0fV, f=%dHz', Vpeak, f));
```

## Calculate Theoretical Values

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

## Prediction Table

Set your signal generator to: **10 Vpeak, 50 Hz, sine wave**

| Configuration | Predicted V\_{avg} (V) | Predicted ripple |
|---------------|----------------------|------------------|
| Half-wave | | |
| Full-wave | | |
| Full-wave + 100 µF | | |
| Full-wave + 470 µF | | |

---

# Components Required

## Components to Purchase

- 4 × 1N4001–1N4007 diodes
- 100 µF electrolytic capacitor
- 470 µF electrolytic capacitor
- 1 kΩ load resistor

## Equipment You Already Have

- Signal generator (AC source — set to 10 Vpeak, 50 Hz, sine)
- DSO Nano Oscilloscope
- Multimeter
- Breadboard and jumper wires

---

# Safety Notice

```text
DO NOT CONNECT DIRECTLY TO MAINS VOLTAGE
```

For laboratory work use only:

- Low-voltage AC supplies
- Isolated function generators

---

# Experiment 1 - Measure AC Voltage

## Objective

Observe an AC waveform.

---

# Probe Connections

Probe Tip:

```text
AC Source
```

Probe Ground:

```text
Reference Ground
```

---

# DSO Nano Settings

Vertical:

```text
2 V/div
```

Horizontal:

```text
5 ms/div
```

Trigger:

```text
Rising Edge
```

---

# Expected Waveform

```text
      /\
     /  \
----/----\----
   /      \
  /        \
```

---

# Record Measurements

| Parameter | Measured Value |
|-----------|---------------|
| Frequency | |
| Peak Voltage | |
| RMS Voltage | |

---

# Experiment 2 - Half-Wave Rectifier

## Objective

Observe half-wave rectification.

---

# Circuit

One diode and one load resistor.

---

# Expected Output

```text
      /\      /\
     /  \    /  \
____/    \__/    \____

______________________
```

---

# Record Measurements

| Parameter | Measured Value |
|-----------|---------------|
| Peak Voltage | |
| Average Voltage | |
| Frequency | |

---

# Experiment 3 - Bridge Rectifier

## Objective

Observe full-wave rectification.

---

# Circuit

Bridge rectifier plus load resistor.

---

# Expected Output

```text
     /\      /\      /\
    /  \    /  \    /  \
___/    \__/    \__/    \___
```

---

# Record Measurements

| Parameter | Measured Value |
|-----------|---------------|
| Peak Voltage | |
| Average Voltage | |
| Ripple Frequency | |

---

# Why Is Full-Wave Rectification Better?

Advantages:

✅ Higher average voltage

✅ Lower ripple

✅ Better transformer utilisation

✅ Improved efficiency

---

# Experiment 4 - Capacitor Smoothing

## Objective

Reduce ripple voltage.

---

# Add Capacitor

Connect:

```text
100 µF Capacitor
```

across the rectifier output.

---

# Observe

Compare:

```text
Without Capacitor
```

and

```text
With Capacitor
```

---

# DSO Nano Measurement

## Probe Connections

Probe Tip:

```text
DC Output
```

Probe Ground:

```text
Circuit Ground
```

---

# DSO Nano Settings

Vertical:

```text
500 mV/div
```

Horizontal:

```text
5 ms/div
```

Trigger:

```text
Rising Edge
```

---

# Record Observations

```text
_____________________________________

_____________________________________

_____________________________________
```

---

# Results Table

| Configuration | Ripple Voltage |
|---------------|---------------|
| Half-Wave | |
| Full-Wave | |
| Full-Wave + 100 µF Capacitor | |
| Full-Wave + 470 µF Capacitor | |

---

# Relationship to Previous Projects

## Project 2

Capacitor charging and discharging.

---

## Project 3

Energy storage concepts.

---

## Project 9

Output ripple in Buck Converters.

---

## Project 11

Energy transfer using inductors.

---

# MATLAB Comparison

Now overlay your measured waveform parameters against the simulated predictions.

## Enter Your Measured Values

```matlab
Vpeak = 10; f = 50; R = 1000;
t = 0:0.0001:0.1;
v_ac = Vpeak * sin(2*pi*f*t);
v_fw = abs(v_ac);

% Simulated configurations
v_fw_100 = smooth_rc(v_fw, t, R, 100e-6);
v_fw_470 = smooth_rc(v_fw, t, R, 470e-6);

% Your measured values — replace zeros
Vavg_measured  = [0.0, 0.0, 0.0, 0.0];   % (V) half-wave, FW, FW+100uF, FW+470uF
ripple_measured = [0.0, 0.0, 0.0, 0.0];  % (V) peak-to-peak ripple

configs   = {max(v_ac,0), v_fw, v_fw_100, v_fw_470};
labels    = {'Half-Wave','Full-Wave','FW+100\muF','FW+470\muF'};

% Bar chart: simulated vs measured average voltage
Vavg_sim = cellfun(@mean, configs);

figure;
subplot(2,1,1);
x = 1:4;
bar(x, [Vavg_sim; Vavg_measured]', 0.6);
set(gca,'XTickLabel', labels);
legend('Simulated','Measured','Location','northwest');
ylabel('Average Voltage (V)'); grid on;
title('Average DC Voltage \mdash Simulation vs Measurement');

ripple_sim = cellfun(@(v) max(v)-min(v), configs);
subplot(2,1,2);
bar(x, [ripple_sim; ripple_measured]', 0.6);
set(gca,'XTickLabel', labels);
legend('Simulated','Measured','Location','northeast');
ylabel('Ripple Voltage (V)'); grid on;
title('Ripple Voltage \mdash Simulation vs Measurement');
```

## Reflection

- Does increasing capacitance from 100µF to 470µF reduce ripple by the ratio you expected (470/100 ≈ 4.7×)?
- The bridge rectifier uses two diodes in series per half-cycle. How does this affect the measured average voltage compared to the simulation which assumed ideal diodes?
- How does the ripple frequency of the full-wave rectifier compare to the input frequency, and why?

---

# Engineering Applications

Rectifiers are used in:

## Power Supplies

AC-to-DC conversion.

---

## Battery Chargers

Charging DC batteries.

---

## Industrial Drives

Generating DC bus voltage.

---

## Renewable Energy Systems

Power conversion stages.

---

## Consumer Electronics

Phone chargers and adapters.

---

# Knowledge Check

## Question 1

What is rectification?

Answer:

```text
____________________
```

---

## Question 2

What does a diode do?

Answer:

```text
____________________
```

---

## Question 3

Why is a bridge rectifier better than a half-wave rectifier?

Answer:

```text
____________________
```

---

## Question 4

What is ripple voltage?

Answer:

```text
____________________
```

---

## Question 5

Why is a smoothing capacitor used?

Answer:

```text
____________________
```

---

## Question 6

A full-wave rectifier with a 100µF capacitor produces 2V of ripple at 50Hz with a 1kΩ load. Estimate the ripple if the capacitor is replaced with 470µF, using the approximation V_ripple ≈ I_load / (f_ripple × C). Show your working.

Answer:

```text
____________________
```

---

# Common Mistakes

## No Output Voltage

Check:

- Diode polarity
- Wiring connections
- AC source

---

## Excessive Ripple

Check:

- Capacitor value
- Capacitor polarity
- Load current

---

## Incorrect Waveform

Check:

- Oscilloscope trigger
- Ground connection
- Time scale

---

# Troubleshooting Checklist

✅ AC source connected

✅ Diodes oriented correctly

✅ Load resistor connected

✅ Capacitor polarity verified

✅ Oscilloscope triggering correctly

✅ Ripple measured

✅ Rectification verified

---

# Project Summary

In this project you learned:

✅ AC and DC fundamentals

✅ Diode operation

✅ Half-wave rectification

✅ Full-wave rectification

✅ Bridge rectifiers

✅ Ripple voltage

✅ Capacitor smoothing

✅ Power supply fundamentals

You have now studied:

```text
AC → DC Conversion
```

which is the first stage of many practical power electronic systems.

---

# Next Project

**13_DC_AC_Inverters.md**

Topics:

- H-Bridge Circuits
- MOSFET Switching
- Square-Wave Inverters
- PWM Inverters
- Sinusoidal PWM (SPWM)
- Generating AC from DC
