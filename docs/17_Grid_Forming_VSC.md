# Project 17 - Grid-Forming Voltage Source Converter (VSC)

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
- 13_DC_AC_Inverters.md
- 14_System_Identification.md
- 15_Controller_Design.md
- 16_Grid_Following_VSC.md

---

# Objective

In this project you will learn:

- What a Grid-Forming Converter is
- How Grid-Forming differs from Grid-Following
- How an inverter creates voltage and frequency
- Voltage feedback control
- Frequency regulation
- SPWM implementation
- Droop control
- Virtual Synchronous Machine concepts
- Microgrid fundamentals

This project serves as the capstone project for the course.

---

# Learning Outcomes

At the end of this project you should be able to:

✅ Explain Grid-Forming operation

✅ Generate AC voltage autonomously

✅ Implement SPWM

✅ Implement voltage feedback

✅ Regulate output voltage

✅ Explain droop control

✅ Understand Virtual Synchronous Machines

✅ Compare Grid-Following and Grid-Forming converters

---

# Safety Notice

```text
DO NOT CONNECT DIRECTLY TO MAINS VOLTAGE
```

All experiments must use:

- Low-voltage DC supplies
- Low-power loads
- Isolated laboratory circuits

Recommended:

```text
12 V DC Input

5–12 V RMS Output
```

---

# Introduction

Project 16 introduced:

```text
Grid-Following Converters
```

Those converters require an existing grid.

They:

```text
Measure Voltage

Inject Current
```

---

# What If No Grid Exists?

Examples:

- Microgrids
- Battery Systems
- Standalone Power Systems
- Backup Generators

There may be:

```text
No Existing Voltage Reference
```

The inverter must therefore create:

```text
Voltage

Frequency

Phase
```

itself.

---

# Grid-Forming Concept

A Grid-Forming converter behaves as an AC voltage source.

Instead of:

```text
Current Control
```

it primarily performs:

```text
Voltage Control
```

---

# Grid-Following versus Grid-Forming

| Feature | Grid-Following | Grid-Forming |
|----------|--------------|--------------|
| PLL Required | Yes | No |
| Existing Grid Required | Yes | No |
| Controls Current | Yes | Usually |
| Controls Voltage | No | Yes |
| Controls Frequency | No | Yes |
| Black Start | No | Yes |
| Islanded Operation | No | Yes |

---

# Black Start Capability

A Grid-Forming converter can:

```text
Start a Dead Network
```

without requiring an external voltage source.

This capability is known as:

```text
Black Start
```

---

# Complete System Architecture

```text
          Voltage Reference
                  │
                  ▼
         Frequency Generator
                  │
                  ▼
           PI Controller
                  │
                  ▼
         Modulation Index
                  │
                  ▼
                SPWM
                  │
                  ▼
             H-Bridge
                  │
                  ▼
             LC Filter
                  │
                  ▼
                Load
                  ▲
                  │
           Voltage Sensor
                  │
                  └────────── Feedback
```

---

# Hardware Requirements

## Controller

Recommended:

```text
ESP32 DevKit
```

Alternatives:

```text
STM32 Nucleo

Arduino Mega
```

---

## Inverter Stage

### Gate Driver

```text
IR2104
```

Recommended.

Alternative:

```text
IR2110
```

---

### MOSFETs

```text
4 × IRLZ44N
```

---

## Sensors

### Voltage Measurement

```text
Resistor Divider
```

### Current Measurement

```text
ACS712
```

or

```text
ACS758
```

---

## LC Filter

### Inductor

```text
1 mH to 5 mH
```

### Capacitor

```text
1 µF Film Capacitor
```

---

## Test Equipment

- DSO Nano
- Multimeter
- Bench Power Supply

---

# Complete Materials List

```text
ESP32 DevKit

IR2104 Driver

4 × IRLZ44N MOSFETs

ACS712 Current Sensor

1 mH Inductor

1 µF Film Capacitor

470 µF Electrolytic Capacitor

100 nF Ceramic Capacitor

12 V Bench Supply

DSO Nano

Breadboard

Jumper Wires

Multimeter
```

---

# Full System Schematic

```text
                    +12V DC Supply
                           │
                           │
                    DC Link Capacitor
                           │
                           ▼

                  ┌────────────────┐
                  │   H-BRIDGE     │
                  │ Q1 Q2 Q3 Q4    │
                  └───────┬────────┘
                          │

                       SPWM
                          ▲
                          │

                  ┌─────────────┐
                  │    ESP32    │
                  │             │
                  │ PI Control  │
                  │ Frequency   │
                  │ Generator   │
                  └─────┬───────┘
                        │

             ┌──────────┴──────────┐

             ▼                     ▼

      Voltage Sensor        Current Sensor

             ▲                     ▲

             └─────────┬───────────┘
                       │

                    LC Filter

                       │

                       ▼

                      Load
```

---

# DC Link Circuit

Every practical inverter requires a DC-link capacitor.

```text
          +12 V Supply

                │

           ┌────────┐

           │ 470µF  │

           │        │

           └────────┘

                │

           H-Bridge
```

Recommended:

```text
470 µF Electrolytic

+

100 nF Ceramic
```

mounted near the MOSFET bridge.

---

# Full H-Bridge Schematic

```text
              +Vdc
                │
          ┌─────┴─────┐
          │           │
         Q1          Q2
          │           │
          ├─── LOAD ──┤
          │           │
         Q3          Q4
          │           │
          └─────┬─────┘
                │
               GND
```

---

# H-Bridge Operation

## Positive Half-Cycle

Turn ON:

```text
Q1

Q4
```

Current flows:

```text
+Vdc

 ↓

Q1

 ↓

Load

 ↓

Q4

 ↓

GND
```

---

## Negative Half-Cycle

Turn ON:

```text
Q2

Q3
```

Current flows in the opposite direction.

---

# Shoot-Through Warning

Never enable:

```text
Q1 and Q3
```

or:

```text
Q2 and Q4
```

simultaneously.

This creates:

```text
Direct Supply Short Circuit
```

---

# Dead Time

A delay is inserted between switching events.

This delay is called:

```text
Dead Time
```

Typical values:

```text
1 µs to 5 µs
```

---

# Example Dead-Time Logic

```text
Q1 OFF

Wait

Q4 OFF

Wait

Q2 ON

Q3 ON
```

---

# MOSFET Driver Connections

Example using an IR2104.

```text
             ESP32

         PWM_H   PWM_L
            │      │
            ▼      ▼

            IR2104

          HO      LO

           │       │

           ▼       ▼

          Q1      Q3

          Q2      Q4
```

---

# LC Output Filter

The H-Bridge output contains PWM ripple.

An LC filter smooths the waveform.

```text
            H-Bridge

                │

                L

                │

                ●────── Load

                │

                C

                │

               GND
```

---

# Why Use an LC Filter?

Advantages:

✅ Lower harmonic distortion

✅ Reduced ripple

✅ Better voltage quality

✅ Improved sine-wave approximation

---

# Voltage Measurement Circuit

The ESP32 must never measure the inverter voltage directly.

Use a divider:

```text
Output Voltage

      │

     47 kΩ

      │──── ADC

     10 kΩ

      │

     GND
```

---

# Current Measurement Circuit

Place the ACS712 after the filter.

```text
          LC Filter

               │

               ▼

            ACS712

               │

               ▼

              Load
```

---

# Voltage Reference

The inverter generates:

$$
v^*(t)
=
V_m \sin(\omega t)
$$

Where:

- $V_m$ = Desired Peak Voltage
- $\omega$ = Angular Frequency

---

# Example

Desired output:

$$
v^*(t)
=
5\sin(2\pi50t)
$$

Produces:

```text
50 Hz AC Reference
```

---

# Internal Oscillator

Unlike Grid-Following converters:

```text
No PLL Required
```

The inverter generates its own electrical angle.

---

# Angle Generation

$$
\theta
=
\omega t
$$

where:

$$
\omega
=
2\pi f
$$

For:

$$
f=50Hz
$$

---

# Voltage Error

The controller computes:

$$
e
=
V^*
-
V
$$

---

# Voltage Control Loop

```text
Voltage Reference
        ↓
   Error Calculation
        ↓
    PI Controller
        ↓
  Modulation Index
        ↓
       SPWM
        ↓
     Inverter
        ↓
   Output Voltage
        ↓
      Feedback
```

---

# PI Voltage Controller

$$
u
=
K_Pe
+
K_I\int e\,dt
$$

---

# Why Use PI Control?

The PI controller:

✅ Removes steady-state error

✅ Improves regulation

✅ Compensates for load changes

---

# Modulation Index

Symbol:

$$
m
$$

Range:

```text
0 to 1
```

Relationship:

$$
V_{OUT} \propto m
$$

As modulation index increases:

```text
Output Voltage Increases
```

---

# SPWM Implementation

SPWM stands for:

```text
Sinusoidal Pulse Width Modulation
```

---

# SPWM Concept

A sine-wave reference is compared with a high-frequency carrier.

---

# Comparator Logic

If:

```text
Reference > Carrier
```

PWM Output:

```text
HIGH
```

If:

```text
Reference < Carrier
```

PWM Output:

```text
LOW
```

---

# SPWM Hardware Flow

```text
50 Hz Reference
       │
       ▼

   sin(theta)

       │
       ▼

Compare With

20 kHz Carrier

       │
       ▼

 PWM Pulses

       │
       ▼

 MOSFET Driver

       │
       ▼

   H-Bridge
```

---

# Conceptual SPWM Pattern

```text
| |
| | |
| | | |
| | | | |
| | | | | |
| | | | |
| | | |
```

---

# Digital SPWM Implementation

```cpp
theta += omega * Ts;

if(theta > 2 * PI)
{
    theta -= 2 * PI;
}

float reference = sin(theta);

int pwm =
    (int)(127 + 127 * reference);

pwm = constrain(pwm,0,255);
```

Where:

- `theta` = Electrical Angle
- `omega` = Angular Frequency
- `Ts` = Sampling Time
- `reference` = Sine Reference
- `pwm` = PWM Duty Cycle

---

# Relationship Between PI and SPWM

```text
Voltage Error
      ↓
PI Controller
      ↓
Modulation Index
      ↓
SPWM Generator
      ↓
Gate Signals
      ↓
H-Bridge
```

---

# Frequency Regulation

The converter maintains:

$$
f = 50Hz
$$

independently of load conditions.

---

# Droop Control

Grid-Forming converters often emulate synchronous generators.

---

# Active Power Droop

$$
f
=
f_0
-
K_P(P-P_0)
$$

---

# Reactive Power Droop

$$
V
=
V_0
-
K_Q(Q-Q_0)
$$

---

# Why Use Droop Control?

Droop allows:

```text
Multiple Inverters
```

to share loads automatically.

---

# Virtual Synchronous Machine (VSM)

A Virtual Synchronous Machine emulates the behavior of a rotating generator using software.

---

# Benefits of VSM Control

✅ Synthetic Inertia

✅ Better Frequency Stability

✅ Improved Dynamic Response

✅ Enhanced Microgrid Performance

---

# Recommended Build Stages

## Stage 1

Generate a 50 Hz reference.

Verify:

```text
Frequency

Amplitude
```

---

## Stage 2

Generate SPWM.

Verify:

```text
PWM Frequency

Duty Cycle Variation
```

---

## Stage 3

Build and test the H-Bridge.

Verify:

```text
Alternating Output Voltage
```

---

## Stage 4

Install the LC Filter.

Verify:

```text
Smooth AC Voltage
```

---

## Stage 5

Implement Voltage Measurement.

Verify ADC accuracy.

---

## Stage 6

Implement PI Voltage Control.

Verify stable regulation.

---

## Stage 7

Implement Droop Control.

Study power-sharing behavior.

---

# Experiment 1 - Generate AC Voltage

## Objective

Generate a stable AC voltage waveform.

---

# Measurements

| Parameter | Measured |
|------------|----------|
| Frequency | |
| RMS Voltage | |
| Peak Voltage | |

---

# Experiment 2 - Load Regulation

## Test Loads

```text
100 Ω

220 Ω

470 Ω
```

---

# Results Table

| Load | Output Voltage |
|--------|---------------|
| 100 Ω | |
| 220 Ω | |
| 470 Ω | |

---

# Experiment 3 - PI Tuning

Measure:

- Overshoot
- Settling Time
- Voltage Error
- Stability

for different gain settings.

---

# MATLAB Exercise

```matlab
t = 0:0.0001:0.1;

v = 5*sin(2*pi*50*t);

plot(t,v,'LineWidth',2)

grid on

xlabel('Time (s)')
ylabel('Voltage (V)')

title('Grid-Forming Voltage Reference')
```

---

# MATLAB Exercise - Droop Characteristic

```matlab
P = 0:0.1:10;

f0 = 50;

Kp = 0.1;

f = f0 - Kp*P;

plot(P,f,'LineWidth',2)

grid on

xlabel('Power')
ylabel('Frequency (Hz)')

title('Frequency Droop')
```

---

# Knowledge Check

## Question 1

What is the primary difference between Grid-Following and Grid-Forming control?

---

## Question 2

Why is a PLL unnecessary in a Grid-Forming converter?

---

## Question 3

What does the voltage controller regulate?

---

## Question 4

What is droop control?

---

## Question 5

What is a Virtual Synchronous Machine?

---

# Troubleshooting Checklist

✅ SPWM operating correctly

✅ Dead time implemented

✅ H-Bridge switching correctly

✅ LC filter installed

✅ Voltage sensor calibrated

✅ PI controller operating

✅ Output frequency stable

✅ Output voltage regulated

✅ Safe load connection verified

---

# Project Summary

In this project you learned:

✅ Grid-Forming operation

✅ Autonomous AC generation

✅ Voltage regulation

✅ Frequency regulation

✅ SPWM implementation

✅ Droop control

✅ Virtual Synchronous Machines

✅ Microgrid fundamentals

This project combines:

✅ PWM

✅ Inverters

✅ MOSFET Switching

✅ PI Controllers

✅ Power Electronics

✅ System Identification

✅ Controller Design

✅ AC Systems

✅ Renewable Energy Systems

into a complete Grid-Forming Voltage Source Converter architecture.

You have now progressed from:

```text
Basic PWM Generation
```

to:

```text
Autonomous AC Grid Creation
```

using the same fundamental principles employed in modern:

- Battery Energy Storage Systems
- Grid-Forming Inverters
- Standalone Microgrids
- Renewable Energy Plants
- Future Electrical Power Systems
