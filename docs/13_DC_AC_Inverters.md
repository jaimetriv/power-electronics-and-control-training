# Project 13 - DC-AC Inverters and AC Generation

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
- 12_AC_DC_Rectifiers.md

---

# Objective

In this project you will learn:

- What an inverter is
- Why inverters are important
- How DC can be converted into AC
- What an H-Bridge is
- How MOSFETs are used in inverter circuits
- What square-wave inverters are
- What PWM inverters are
- The basics of Sinusoidal PWM (SPWM)

This project completes the three major categories of power conversion:

```text
AC → DC

DC → DC

DC → AC
```

---

# Learning Outcomes

At the end of this project you should be able to:

✅ Explain inverter operation

✅ Explain H-Bridge circuits

✅ Generate AC from DC

✅ Measure inverter waveforms

✅ Explain square-wave inverters

✅ Explain PWM inverters

✅ Understand SPWM fundamentals

✅ Explain dead time and shoot-through

---

# Introduction

An inverter converts:

```text
Direct Current (DC)
```

into:

```text
Alternating Current (AC)
```

Examples:

```text
12 V DC → 230 V AC

24 V DC → 230 V AC

48 V DC → 230 V AC
```

The actual output voltage depends on the inverter design and transformer ratio.

---

# Why Are Inverters Important?

Many electrical energy sources naturally produce DC power:

- Batteries
- Solar Panels
- Fuel Cells

Many loads require AC power:

- Motors
- Appliances
- Industrial Equipment
- Utility Grids

Therefore:

```text
DC Source
     ↓
 Inverter
     ↓
 AC Output
```

---

# Applications

Inverters are used in:

## Solar Energy Systems

Converting solar-generated DC into AC.

---

## Uninterruptible Power Supplies

Providing backup AC power.

---

## Electric Vehicles

Driving AC traction motors.

---

## Variable-Speed Drives

Controlling industrial motors.

---

## Renewable Energy Systems

Grid-connected power conversion.

---

# Review of AC Voltage

AC voltage changes polarity over time.

Example waveform:

```text
Voltage

 +V       /\
         /  \
 0V ----/----\----/----
       /      \  /
 -V   /        \/
```

To create AC from DC we must repeatedly reverse the voltage polarity applied to the load.

---

# Basic Inverter Principle

Suppose a load is connected alternately to:

```text
+12 V
```

and

```text
-12 V
```

The voltage applied to the load changes polarity and an AC waveform is produced.

---

# Square-Wave Inverter

The simplest inverter produces alternating positive and negative voltages.

---

# Square-Wave Output

```text
+V  ________        ________
           |        |
           |        |
-V ________|________|________
```

The polarity reverses periodically, creating AC.

---

# Output Frequency

The switching frequency determines the output frequency.

Examples:

```text
50 Hz
```

or

```text
60 Hz
```

---

# What Is an H-Bridge?

An H-Bridge is the most common inverter topology.

It uses four switches to reverse the voltage across a load.

---

# Simplified H-Bridge

```text
      +V

    S1    S2
     |    |
     +----+
     |LOAD|
     +----+
     |    |
    S3    S4

      GND
```

---

# Why Is It Called an H-Bridge?

The arrangement resembles the letter:

```text
H
```

---

# State A

Switches ON:

```text
S1 and S4
```

Current flows:

```text
Left → Right
```

Load voltage is positive.

---

# State B

Switches ON:

```text
S2 and S3
```

Current flows:

```text
Right → Left
```

Load voltage is negative.

---

# AC Generation

Alternating between State A and State B creates an AC output waveform.

---

# Shoot-Through

Never turn ON:

```text
S1 and S3
```

simultaneously.

Never turn ON:

```text
S2 and S4
```

simultaneously.

This creates a direct short circuit across the supply.

This condition is called:

```text
Shoot-Through
```

---

# Dead Time

Practical inverters introduce a small delay between switching transitions.

This delay is called:

```text
Dead Time
```

Dead time helps prevent:

```text
Shoot-Through
```

and protects the switching devices.

---

# MOSFET-Based Inverters

Most modern inverters use:

```text
MOSFETs
```

or

```text
IGBTs
```

Advantages:

✅ High efficiency

✅ Fast switching

✅ PWM capability

✅ Good power handling

---

# PWM Inverters

Modern inverters rarely use pure square waves.

Instead they use:

```text
Pulse Width Modulation
```

---

# Why Use PWM?

PWM provides:

- Better waveform quality
- Improved efficiency
- Reduced harmonic distortion
- More precise output control

---

# PWM Inverter Concept

```text
High-Frequency PWM
          ↓
      Filtering
          ↓
  AC Waveform
```

---

# Sinusoidal PWM (SPWM)

Most modern inverters use:

```text
Sinusoidal PWM
```

or:

```text
SPWM
```

---

# How SPWM Works

A sinewave reference is compared against a high-frequency carrier waveform.

The resulting PWM pulses vary in width according to the sinewave.

The average voltage follows a sinusoidal shape.

---

# Conceptual SPWM Pattern

```text
| |
| | | |
| | | | | |
| | | | | | |
| | | | | |
| | | |
| |
```

The pulse widths increase and then decrease.

---

# Filtered Output

After passing through a filter:

```text
SPWM
   ↓
Filter
   ↓
Approximate Sine Wave
```

---

# Inverter Types

## Square-Wave Inverter

Advantages:

- Very simple
- Low cost

Disadvantages:

- High harmonic distortion
- Poor waveform quality

---

## PWM Inverter

Advantages:

- Better waveform quality
- Improved efficiency

Disadvantages:

- Increased complexity

---

## Pure Sine Wave Inverter

Advantages:

- Excellent waveform quality
- Suitable for sensitive electronics

Disadvantages:

- More complex design

---

# MATLAB Simulation

Before building the circuit, simulate the three inverter waveform types and compare their harmonic content.

## Square Wave, SPWM and Filtered Output

```matlab
f_out = 50;           % output frequency (Hz)
f_sw  = 2000;         % SPWM carrier frequency (Hz)
t     = 0:1e-5:0.06;

% Ideal sine wave reference
v_sine = sin(2*pi*f_out*t);

% Square wave inverter output
v_square = sign(v_sine);

% SPWM: compare sine reference against triangular carrier
Ts_sw    = 1 / f_sw;
carrier  = 2*abs(mod(t, Ts_sw)/Ts_sw - 0.5) - 0.5;  % triangular -0.5 to +0.5
v_spwm   = sign(v_sine - carrier);                    % +1 or -1

% Simulate LC filter on SPWM output (simple first-order for illustration)
L = 1e-3; C = 10e-6;
G_filt = tf(1, [L*C, 0, 1]);
[v_filt, ~] = lsim(G_filt, v_spwm, t);

figure;
subplot(4,1,1); plot(t*1e3, v_sine,   'b', 'LineWidth',1.5); grid on;
ylabel('V'); title('Reference Sine Wave (50 Hz)');
subplot(4,1,2); plot(t*1e3, v_square, 'r', 'LineWidth',1.5); grid on;
ylabel('V'); title('Square Wave Inverter Output');
subplot(4,1,3); plot(t*1e3, v_spwm,   'g', 'LineWidth',1); grid on;
ylabel('V'); title(sprintf('SPWM Output (f_{sw}=%d Hz)', f_sw));
subplot(4,1,4); plot(t*1e3, v_filt,   'm', 'LineWidth',2); hold on;
plot(t*1e3, v_sine, 'b--', 'LineWidth',1); grid on;
ylabel('V'); title('Filtered SPWM \approx Sine Wave');
xlabel('Time (ms)');
sgtitle('Inverter Waveform Comparison');
```

## Harmonic Spectrum — Square Wave vs Sine Wave

```matlab
fs = 1/1e-5;          % sample rate
N  = length(t);

F_sq   = abs(fft(v_square)) / N;
F_sine = abs(fft(v_sine))   / N;
freqs  = (0:N-1) * fs / N;

figure;
subplot(2,1,1);
stem(freqs(1:500), F_sq(1:500)*2, 'r', 'filled', 'MarkerSize', 3);
xlabel('Frequency (Hz)'); ylabel('Amplitude');
title('Square Wave \mdash Harmonic Spectrum');
grid on; xlim([0 1000]);

subplot(2,1,2);
stem(freqs(1:500), F_sine(1:500)*2, 'b', 'filled', 'MarkerSize', 3);
xlabel('Frequency (Hz)'); ylabel('Amplitude');
title('Sine Wave \mdash Harmonic Spectrum');
grid on; xlim([0 1000]);
```

## Prediction Table

| Waveform | Fundamental (Hz) | Harmonic content | Suitable for sensitive loads? |
|----------|-----------------|-----------------|------------------------------|
| Square wave | | | |
| SPWM (unfiltered) | | | |
| SPWM (filtered) | | | |

---

# Components Required

- Arduino Uno
- Breadboard
- Jumper wires
- 2 × IRLZ44N MOSFETs (for half-bridge demonstration)
- DSO Nano Oscilloscope

Optional:

- IR2104 half-bridge gate driver (handles dead time automatically)

> Note: Full H-bridge experiments require 4 MOSFETs and gate driver ICs. This project demonstrates the waveform generation principles using single-ended PWM outputs.

---

# Safety Notice

This project uses:

```text
Low Voltage Demonstrations Only
```

Do not connect experimental circuits directly to mains wiring.

---

# Experiment 1 - Generate a 50 Hz Square Wave

## Objective

Generate a low-frequency inverter waveform.

---

# Arduino Code

```cpp
void setup()
{
    pinMode(9, OUTPUT);
}

void loop()
{
    digitalWrite(9, HIGH);

    delay(10);

    digitalWrite(9, LOW);

    delay(10);
}
```

---

# Frequency Calculation

The period is:

$$
T = 20 \times 10^{-3}s
$$

Therefore:

$$
f=\frac{1}{T}
$$

$$
f=\frac{1}{0.02}
$$

$$
f=50Hz
$$

---

# Oscilloscope Connections

Probe Tip:

```text
Pin 9
```

Probe Ground:

```text
Arduino GND
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
5V  ________        ________
             |      |
             |      |
0V __________|______|________
```

---

# Measurements

| Parameter | Expected | Measured |
|-----------|----------|----------|
| Frequency | 50 Hz | |
| Period | 20 ms | |
| Peak Voltage | 5 V | |

---

# Experiment 2 - Observe PWM Switching

## Objective

Observe high-frequency PWM operation.

---

# Arduino Code

```cpp
void setup()
{
    pinMode(9, OUTPUT);
}

void loop()
{
    analogWrite(9,128);
}
```

---

# Expected Observation

A PWM waveform should be visible on the oscilloscope.

Typical frequency:

```text
Approximately 490 Hz
```

---

# Experiment 3 - Duty Cycle Investigation

## Test A

```cpp
analogWrite(9,64);
```

Expected:

```text
25% Duty Cycle
```

---

## Test B

```cpp
analogWrite(9,128);
```

Expected:

```text
50% Duty Cycle
```

---

## Test C

```cpp
analogWrite(9,192);
```

Expected:

```text
75% Duty Cycle
```

---

# Results Table

| PWM Value | Duty Cycle | Observation |
|-----------|------------|-------------|
| 64 | 25% | |
| 128 | 50% | |
| 192 | 75% | |

---

# DSO Nano Exercise

## Observe the Square Wave

Measure:

- Frequency
- Period
- Peak voltage

---

## Observe the PWM Signal

Measure:

- PWM frequency
- Duty cycle
- Pulse width

---

# Experiment 4 - SPWM Generation

## Objective

Generate a sinusoidal PWM pattern using a sine lookup table.

The duty cycle varies each cycle to follow a sine wave shape.

---

# Arduino Code

```cpp
// SPWM: 50Hz output, 490Hz PWM carrier
// Duty cycle follows a half-sine lookup table

const int N = 10;                    // steps per half cycle
const int sine_table[N] = {         // half-sine, scaled 0-255
    128, 203, 243, 255, 243,
    203, 128,  53,  13,   0
};

void setup()
{
    pinMode(9, OUTPUT);
}

void loop()
{
    for (int i = 0; i < N; i++)
    {
        analogWrite(9, sine_table[i]);
        delay(2);                    // 2ms per step -> 20ms period -> 50Hz
    }
}
```

---

# What Is Happening?

Each PWM cycle has a different duty cycle.

The duty cycle follows the shape of a sine wave.

The average voltage at each step approximates:

$$
V_{AVG}(t) = V_{DC} \cdot \sin(2\pi f_{out} t)
$$

After low-pass filtering this produces an approximate sine wave output.

---

# DSO Nano Settings

Vertical:

```text
2 V/div
```

Horizontal:

```text
2 ms/div
```

Trigger:

```text
Rising Edge
```

---

# Expected Observation

You should observe PWM pulses with varying width:

```text
| |   | |     | |       | |     | |   | |
```

Narrow pulses at the start and end, wide pulses in the middle.

This is the SPWM pattern.

---

# Measurements

| Parameter | Expected | Measured |
|-----------|----------|----------|
| PWM carrier frequency | ~490 Hz | |
| Output period | ~20 ms | |
| Output frequency | ~50 Hz | |
| Min duty cycle | ~0% | |
| Max duty cycle | ~100% | |

---

# Relationship to Previous Projects

## Project 1

PWM generation.

---

## Project 4

MOSFET switching.

---

## Project 9

Buck Converter operation.

---

## Project 11

Boost Converter operation.

---

## Project 12

AC-to-DC rectification.

---

# Complete Power Conversion Map

```text
AC → DC
Rectifier

DC → DC
Buck / Boost Converter

DC → AC
Inverter
```

---

# MATLAB Comparison

Now compare your measured square wave and SPWM waveforms against the simulated predictions.

## Enter Your Measured Values

```matlab
f_measured   = 50.0;     % replace with your measured frequency from Experiment 1 (Hz)
T_measured   = 1 / f_measured;
Vpeak_meas   = 5.0;      % replace with your measured peak voltage (V)

t = 0:1e-5:0.06;

% Ideal 50Hz square wave
v_ideal = Vpeak_meas * sign(sin(2*pi*50*t));

% Reconstructed from measured frequency
v_meas  = Vpeak_meas * sign(sin(2*pi*f_measured*t));

figure; hold on;
plot(t*1e3, v_ideal, 'b--', 'LineWidth', 2, ...
    'DisplayName', sprintf('Ideal 50Hz square wave'));
plot(t*1e3, v_meas,  'r',   'LineWidth', 2, ...
    'DisplayName', sprintf('Measured f=%.1fHz', f_measured));
grid on;
xlabel('Time (ms)'); ylabel('Voltage (V)');
title('Square Wave Inverter \mdash Ideal vs Measured');
legend('Location', 'northeast');

fprintf('Ideal frequency:    50.0 Hz\n');
fprintf('Measured frequency: %.1f Hz\n', f_measured);
fprintf('Frequency error:    %.2f%%\n', 100*abs(f_measured-50)/50);
```

## SPWM Duty Cycle Verification

```matlab
% Theoretical SPWM duty cycles from the lookup table
N = 10;
i = 0:N-1;
D_theory  = 0.5 * (1 + sin(2*pi*i/N));   % normalised 0-1
D_arduino = [128, 203, 243, 255, 243, 203, 128, 53, 13, 0] / 255;

figure; hold on;
plot(i, D_theory,  'b--o', 'LineWidth', 2, 'DisplayName', 'Ideal sine');
plot(i, D_arduino, 'r-s',  'LineWidth', 2, 'DisplayName', 'Arduino lookup table');
grid on;
xlabel('Step'); ylabel('Duty Cycle');
title('SPWM Lookup Table \mdash Ideal vs Arduino');
legend('Location', 'south');
```

## Reflection

- Does your measured square wave frequency match 50 Hz? What causes any discrepancy? (Arduino `delay()` accuracy, loop overhead)
- The SPWM lookup table uses only 10 steps per cycle. How would increasing to 20 steps improve the output waveform quality?
- Why does the square wave have significant harmonic content at 150 Hz, 250 Hz, 350 Hz etc., while a pure sine wave does not?

---

# Engineering Applications

Inverters are used in:

## Solar Inverters

Converting solar power into AC.

---

## Electric Vehicles

Motor drive systems.

---

## UPS Systems

Backup power.

---

## Industrial Drives

Variable-speed motor control.

---

## Renewable Energy Systems

Grid-connected power conversion.

---

# Knowledge Check

## Question 1

What is an inverter?

Answer:

```text
____________________
```

---

## Question 2

What is the purpose of an H-Bridge?

Answer:

```text
____________________
```

---

## Question 3

Why is PWM used in modern inverters?

Answer:

```text
____________________
```

---

## Question 4

What is SPWM?

Answer:

```text
____________________
```

---

## Question 5

What is shoot-through?

Answer:

```text
____________________
```

---

## Question 6

A square wave at 50 Hz contains harmonics at 150 Hz, 250 Hz, 350 Hz and so on. Explain why these odd harmonics are present and why they are absent in a pure sine wave. Why does this matter for motor drives?

Answer:

```text
____________________
```

---

# Common Mistakes

## Incorrect Frequency

Check:

- Delay values
- Frequency calculations

---

## PWM Not Visible

Check:

- Arduino sketch
- Probe location
- Trigger settings

---

## Unstable Display

Check:

- Trigger level
- Time scale
- Ground connection

---

# Troubleshooting Checklist

✅ Arduino operating correctly

✅ Square wave measured

✅ Frequency verified

✅ PWM measured

✅ Duty cycle changes correctly

✅ DSO Nano triggering correctly

---

# Project Summary

In this project you learned:

✅ DC-to-AC conversion

✅ Inverter fundamentals

✅ H-Bridge operation

✅ MOSFET switching

✅ Square-wave generation

✅ PWM inverters

✅ SPWM concepts

✅ Dead time and shoot-through protection

✅ Practical inverter applications

You have now studied all three major power conversion categories:

```text
AC → DC

DC → DC

DC → AC
```

These technologies form the foundation of:

- Power Supplies
- Motor Drives
- Renewable Energy Systems
- Industrial Power Electronics

---

# Next Project

**14_System_Identification.md**

Topics:

- Dynamic System Modelling
- Experimental Measurements
- Time Constant Estimation
- First-Order Models
- Second-Order Models
- Transfer Functions
- Model Validation
