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

# Components Required

- Arduino Uno
- Breadboard
- Jumper Wires
- MOSFETs
- DSO Nano Oscilloscope

Optional:

- H-Bridge Driver Module

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

# MATLAB Exercise - Generate a Sine Wave

```matlab
t = 0:0.0001:0.1;

v = sin(2*pi*50*t);

plot(t,v,'LineWidth',2)

grid on

xlabel('Time (s)')
ylabel('Amplitude')

title('50 Hz Sine Wave')
```

---

# MATLAB Exercise - Generate a Square Wave

```matlab
t = 0:0.0001:0.1;

v = sign(sin(2*pi*50*t));

plot(t,v,'LineWidth',2)

grid on

xlabel('Time (s)')
ylabel('Amplitude')

title('50 Hz Square Wave')
```

---

# Compare

Observe the difference between:

```text
Sine Wave
```

and

```text
Square Wave
```

Consider:

- Waveform shape
- Harmonic content
- Smoothness

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
