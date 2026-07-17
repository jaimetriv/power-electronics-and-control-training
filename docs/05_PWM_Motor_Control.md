# Project 5 - PWM Motor Control and First-Order System Dynamics

## Prerequisites

Complete:

- 00_Introduction.md
- 00A_DSO_Nano_Familiarisation.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md
- 03_RLC_Circuits.md
- 04_MOSFET_Fundamentals.md

---

# Objective

In this project you will learn:

- How DC motors work
- How PWM controls motor speed
- How a MOSFET controls motor power
- What motor inertia is
- Why motors do not respond instantly
- What a first-order dynamic system is
- How to estimate motor time constants

This project bridges the gap between:

```text
Electronics
```

and

```text
Control Systems
```

The motor will become our first real-world dynamic plant.

---

# Learning Outcomes

At the end of this project you should be able to:

✅ Explain DC motor operation

✅ Control motor speed with PWM

✅ Drive a motor using a MOSFET

✅ Measure PWM signals using the DSO Nano

✅ Explain motor inertia

✅ Understand motor time constants

✅ Model a motor as a first-order system

---

# Theory

## What Is a DC Motor?

A DC motor converts:

```text
Electrical Energy
```

into:

```text
Mechanical Energy
```

When voltage is applied:

- Current flows through motor windings.
- A magnetic field is created.
- Torque is produced.
- The shaft begins to rotate.

---

# Simplified Motor Model

```text
Voltage
   |
   ↓
Current
   |
   ↓
Torque
   |
   ↓
Speed
```

---

# Why Doesn't a Motor Reach Full Speed Instantly?

Motors have:

```text
Mass
```

and

```text
Inertia
```

Just like a car cannot instantly accelerate from:

```text
0 mph
```

to

```text
70 mph
```

a motor cannot instantly reach maximum speed.

Instead speed rises gradually.

---

# Example Motor Response

```text
Speed

100% |           ________
     |         /
     |       /
     |     /
     |   /
   0 +---------------------
            Time
```

Notice how the response resembles the RC charging curve from Project 2.

---

# First-Order Motor Model

A DC motor can often be approximated by:

$$
G(s)=\frac{K}{\tau s+1}
$$

Where:

- $K$ = System Gain
- $\tau$ = Motor Time Constant

This is exactly the same form as the RC circuit studied previously.

---

# PWM Motor Control

PWM controls the average voltage applied to the motor.

Average voltage:

$$
V_{AVG}=D \cdot V_S
$$

Where:

- $D$ = Duty Cycle
- $V_S$ = Supply Voltage

---

# Example

Given:

$$
D=0.5
$$

and:

$$
V_S=5V
$$

Then:

$$
V_{AVG}=2.5V
$$

The motor receives less average voltage and therefore rotates more slowly.

---

# Why Use PWM Instead of a Resistor?

Resistor control wastes energy.

PWM control is much more efficient.

The MOSFET is either:

```text
Fully ON
```

or

```text
Fully OFF
```

which minimises power loss.

---

# Required Components

## Hardware

- Arduino Uno
- Breadboard
- Jumper Wires
- Logic-Level MOSFET (IRLZ44N recommended)
- DC Motor
- Flyback Diode (1N4001-1N4007)
- External Battery Pack

## Equipment

- DSO Nano Oscilloscope

---

# Important Safety Note

Never connect a motor directly to an Arduino output pin.

Motors can draw significantly more current than the Arduino can safely provide.

Always use:

```text
MOSFET Driver Circuit
```

---

# Why Is a Flyback Diode Needed?

Motors are inductive loads.

When current is interrupted, a high voltage spike can occur.

The flyback diode protects:

- Arduino
- MOSFET
- Other electronics

---

# Motor Driver Circuit

```mermaid
graph TD

A[Arduino Pin 9]
--> B[220 Ohm]

B --> C[Gate]

D[Motor]
--> C2[Drain]

C2 --> E[MOSFET]

E --> F[GND]

G[Battery +]
--> D

H[Flyback Diode]
--- D
```

---

# Simplified Wiring Diagram

```text
Battery +
    |
    |
  Motor
    |
    |
 Drain

MOSFET

Source
    |
   GND

Arduino Pin 9
      |
    220Ω
      |
    Gate

Flyback Diode Across Motor
```

---

# Experiment 1 - Full-Speed Motor Control

## Objective

Turn the motor fully ON and OFF.

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

    delay(3000);

    digitalWrite(9, LOW);

    delay(3000);
}
```

---

# Observation

Notice:

- Motor accelerates gradually.
- Motor decelerates gradually.

Unlike an LED:

```text
The response is not instantaneous.
```

---

# Questions

Why does speed increase slowly?

```text
________________________________
```

---

Why does speed decrease slowly?

```text
________________________________
```

---

# Experiment 2 - PWM Speed Control

## Objective

Control motor speed using PWM.

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

# Expected Result

The motor should rotate at a lower speed than full power.

---

# DSO Nano Measurement

Probe Location:

```text
MOSFET Gate
```

Ground:

```text
Circuit Ground
```

---

# DSO Nano Settings

Vertical:

```text
2 V/div
```

Horizontal:

```text
500 us/div
```

Trigger:

```text
Rising Edge
```

---

# Expected Waveform

```text
5V ─────      ─────
         │      │
         │      │
0V ______│______│______
```

---

# Measurements

| Measurement | Expected |
|------------|----------|
| Frequency | ~490Hz |
| Gate Voltage | ~5V |
| Duty Cycle | ~50% |

---

# Experiment 3 - Speed Versus Duty Cycle

## Objective

Investigate the relationship between PWM and motor speed.

---

# Test 1

```cpp
analogWrite(9,64);
```

Expected:

$$
25\%
$$

Motor speed:

```text
Low
```

---

# Test 2

```cpp
analogWrite(9,128);
```

Expected:

$$
50\%
$$

Motor speed:

```text
Medium
```

---

# Test 3

```cpp
analogWrite(9,192);
```

Expected:

$$
75\%
$$

Motor speed:

```text
High
```

---

# Test 4

```cpp
analogWrite(9,255);
```

Expected:

$$
100\%
$$

Motor speed:

```text
Maximum
```

---

# Results Table

| PWM Value | Duty Cycle | Relative Speed |
|------------|------------|----------------|
| 64 | 25% | |
| 128 | 50% | |
| 192 | 75% | |
| 255 | 100% | |

---

# Experiment 4 - Motor Step Response

## Objective

Observe motor dynamics.

This experiment introduces:

```text
Control Theory
```

---

# Arduino Code

```cpp
void setup()
{
    pinMode(9, OUTPUT);
}

void loop()
{
    analogWrite(9,255);

    delay(5000);

    analogWrite(9,0);

    delay(5000);
}
```

---

# Observation

The motor speed should respond like:

```text
Speed

100% |          ________
     |        /
     |      /
     |    /
     |  /
0%  +---------------------
           Time
```

---

# Why?

The motor possesses:

- Inertia
- Mechanical friction
- Electromagnetic dynamics

These create a first-order response.

---

# Estimating A Time Constant

Observe:

```text
Motor Start
```

and estimate the time required to reach:

$$
63.2\%
$$

of final speed.

This estimated time is approximately:

$$
\tau
$$

the motor time constant.

---

# First-Order Comparison

## RC Circuit

$$
\tau = RC
$$

---

## Motor System

Motor time constant:

$$
\tau_m
$$

determined by:

- Rotor inertia
- Friction
- Motor electrical properties

---

# MATLAB Exercise

Model a first-order motor.

```matlab
K = 1;

tau = 0.5;

G = tf(K,[tau 1]);

step(G)

grid on

title('First Order Motor Model')
```

---

# Expected Result

The response should resemble:

```text
Speed

1.0 |           _______
    |         /
    |       /
    |     /
    |   /
0.0 +-------------------
          Time
```

Compare:

- MATLAB response
- RC charging curve
- Actual motor response

---

# MATLAB Exercise - Duty Cycle and Voltage

```matlab
D = 0:0.01:1;

Vavg = 5 .* D;

plot(D,Vavg,'LineWidth',2)

grid on

xlabel('Duty Cycle')
ylabel('Motor Average Voltage (V)')

title('Motor Voltage versus Duty Cycle')
```

---

# Engineering Applications

PWM motor control is used in:

## Electric Vehicles

Motor speed control.

---

## Robotics

Wheel speed control.

---

## Drones

Propeller speed control.

---

## Industrial Automation

Conveyors and actuators.

---

## CNC Machines

Position and speed control.

---

# Knowledge Check

## Question 1

Why can't a motor reach full speed instantly?

Answer:

```text
________________________
```

---

## Question 2

What controls motor speed in this experiment?

Answer:

```text
________________________
```

---

## Question 3

Why is a flyback diode required?

Answer:

```text
________________________
```

---

## Question 4

Why is a MOSFET used?

Answer:

```text
________________________
```

---

## Question 5

Why can a motor often be modelled as a first-order system?

Answer:

```text
________________________
```

---

# Common Mistakes

## Motor Doesn't Spin

Check:

- Battery connected
- MOSFET wiring
- Ground connections

---

## Arduino Resets

Check:

- Shared power supply issues
- Missing flyback diode

---

## MOSFET Gets Hot

Check:

- Logic-level MOSFET
- Wiring
- Motor current rating

---

## PWM Not Visible

Check:

- Scope connections
- Trigger settings
- Horizontal scale

---

# Troubleshooting Checklist

✅ Flyback diode installed

✅ Battery connected

✅ MOSFET pinout verified

✅ Shared ground between Arduino and motor supply

✅ DSO Nano probing gate correctly

✅ PWM observed

---

# Project Summary

In this project you learned:

✅ DC motor fundamentals

✅ PWM speed control

✅ MOSFET motor driving

✅ Flyback diode protection

✅ First-order dynamic behaviour

✅ Motor time constants

✅ Open-loop control

✅ DSO Nano motor measurements

The motor is the first real plant we will control.

In the next projects we will add:

```text
Feedback
```

and begin building true control systems.

---

# Next Project

**06_P_Controller.md**

Topics:

- Feedback
- Error Signals
- Open Loop vs Closed Loop Control
- Proportional Control
- BOE-Bot Line Following
- Controller Gain
- Stability