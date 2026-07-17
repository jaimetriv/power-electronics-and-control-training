# Project 2 - RC Circuits and Time Constants

## Prerequisites

Complete:

- 00_Introduction.md
- 00A_DSO_Nano_Familiarisation.md
- 01_PWM_Fundamentals.md

---

# Objective

In this project you will learn:

- How capacitors work
- How capacitors charge and discharge
- What a time constant is
- How to calculate a time constant
- How to measure a time constant using the DSO Nano
- What a first-order system is
- How theory compares with real measurements

This is one of the most important projects in the entire course because it introduces **dynamic systems**.

Many real-world systems behave similarly:

- Batteries charging
- Temperature control
- Sensor filtering
- Control systems
- Buck converter output filters

---

# Learning Outcomes

At the end of this project you should be able to:

✅ Explain how a capacitor works

✅ Explain capacitor charging

✅ Explain capacitor discharging

✅ Calculate a time constant

✅ Measure a time constant

✅ Understand exponential responses

✅ Understand first-order systems

✅ Compare theory against measurements

---

# Theory

## What is a Capacitor?

A capacitor stores energy in an electric field.

Capacitor symbol:

```text
      ||
------||------
      ||
```

Unlike a resistor:

- A resistor dissipates energy.

A capacitor:

- Stores energy.
- Releases energy later.

---

# Capacitor Energy

The energy stored in a capacitor is:

$$
E = \frac{1}{2}CV^2
$$

Where:

- $E$ = Energy (J)
- $C$ = Capacitance (F)
- $V$ = Voltage (V)

---

# The RC Circuit

An RC circuit contains:

- One resistor
- One capacitor

Circuit:

```text
5V
 |
 |
 R
 |
 +------ Vc
 |
 C
 |
 |
GND
```

We will observe:

$$
V_C
$$

the voltage across the capacitor.

---

# Why Does the Capacitor Not Charge Instantly?

The resistor limits current.

This causes the capacitor voltage to increase gradually.

The capacitor therefore follows a smooth curve rather than an immediate jump.

---

# Capacitor Charging

When power is applied:

```text
0V -> 5V
```

the capacitor voltage rises exponentially.

Equation:

$$
V_C(t)=V_F\left(1-e^{-t/(RC)}\right)
$$

Where:

- $V_C(t)$ = Capacitor voltage at time $t$
- $V_F$ = Final voltage
- $R$ = Resistance
- $C$ = Capacitance
- $t$ = Time

---

# Capacitor Discharging

When the supply is disconnected:

$$
V_C(t)=V_0e^{-t/(RC)}
$$

Where:

- $V_0$ = Initial capacitor voltage

---

# Time Constant

The quantity:

$$
\tau = RC
$$

is called the:

**Time Constant**

This is one of the most important equations in electronics and control engineering.

---

# Physical Meaning of Time Constant

After:

$$
t = \tau
$$

the capacitor reaches:

$$
63.2\%
$$

of its final value.

---

# Charging Table

| Time | Charge Level |
|--------|--------------|
| 1τ | 63.2% |
| 2τ | 86.5% |
| 3τ | 95.0% |
| 4τ | 98.2% |
| 5τ | 99.3% |

After:

$$
5\tau
$$

the capacitor is considered fully charged.

---

# Components Required

From the SparkFun Inventor Kit:

- Arduino Uno
- Breadboard
- Jumper wires
- 10 kΩ resistor
- 100 µF capacitor

Equipment:

- DSO Nano Oscilloscope

---

# Verify Component Values

Before building the circuit:

Resistor:

```text
10 kΩ
```

Capacitor:

```text
100 µF
```

---

# Capacitor Polarity

Electrolytic capacitors are polarized.

The negative lead is usually marked:

```text
-------
-------
-------
```

on the body.

Always connect:

```text
Negative Lead -> GND
```

---

# Calculate the Theoretical Time Constant

Given:

$$
R = 10000 \Omega
$$

and:

$$
C = 100\mu F
$$

Convert capacitance:

$$
100\mu F = 100 \times 10^{-6}F
$$

$$
C = 0.0001F
$$

Now calculate:

$$
\tau = RC
$$

$$
\tau = 10000 \times 0.0001
$$

Result:

$$
\tau = 1s
$$

---

# Prediction

After:

$$
1s
$$

the capacitor should reach:

$$
63.2\%
$$

of:

$$
5V
$$

---

# Calculate Expected Voltage at One Time Constant

Calculate:

$$
0.632 \times 5
$$

Result:

$$
V_C = 3.16V
$$

Prediction:

After:

$$
1s
$$

the capacitor voltage should be approximately:

$$
3.16V
$$

---

# Circuit

```mermaid
graph TD

A[Arduino Pin 9]
--> B[10k Ohm]

B --> C[Vc]

C --> D[100uF Capacitor]

D --> E[GND]
```

---

# Oscilloscope Connections

Probe Tip:

```text
Vc
```

Probe Ground:

```text
GND
```

---

# Physical Connection Diagram

```text
Arduino Pin 9
      |
     10kΩ
      |
      o---- Vc ---- Probe Tip
      |
    100uF
      |
     GND ---------- Probe Ground
```

---

# Experiment 1 - Observe Charging and Discharging

## Objective

Observe the capacitor charging and discharging.

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

# What Does This Program Do?

Pin 9 stays:

```text
HIGH for 3 seconds
```

then:

```text
LOW for 3 seconds
```

The capacitor therefore:

```text
Charges
```

and then:

```text
Discharges
```

continuously.

---

# DSO Nano Settings

Vertical Scale:

```text
1 V/div
```

Horizontal Scale:

```text
500 ms/div
```

Trigger:

```text
Rising Edge
```

---

# Expected Charging Curve

You should observe something similar to:

```text
5V |
   |          _______
   |       /
   |     /
   |   /
0V +-----------------
        Time
```

Notice:

- Fast initial rise
- Slower rise near the top

---

# Expected Discharging Curve

```text
5V |
   |\
   | \
   |  \
   |   \______
0V +-----------------
        Time
```

Notice:

- Fast initial drop
- Slower drop near the bottom

---

# Experiment 2 - Measure the Time Constant

## Objective

Verify the theoretical time constant.

---

# Step 1

Locate:

$$
V_C = 3.16V
$$

on the charging curve.

---

# Step 2

Measure the time required to reach this voltage.

---

# Prediction

The measured time should be approximately:

$$
1s
$$

---

# Results Table

| Parameter | Theory | Measurement |
|------------|----------|-------------|
| Resistance | 10kΩ | |
| Capacitance | 100µF | |
| Time Constant | 1.0s | |
| Voltage at τ | 3.16V | |

---

# Experiment 3 - Change the Capacitor

Replace:

```text
100 µF
```

with:

```text
10 µF
```

---

# Calculate New Time Constant

Convert:

$$
10\mu F = 10 \times 10^{-6}F
$$

$$
C = 0.00001F
$$

Calculate:

$$
\tau = RC
$$

$$
\tau = 10000 \times 0.00001
$$

$$
\tau = 0.1s
$$

---

# Prediction

The charging curve should be much faster.

---

# Results Table

| Capacitor | Time Constant |
|------------|---------------|
| 100µF | 1.0s |
| 10µF | 0.1s |

---

# Experiment 4 - Change the Resistor

Replace:

```text
10 kΩ
```

with:

```text
1 kΩ
```

Return capacitor to:

```text
100 µF
```

---

# Calculate

$$
\tau = RC
$$

$$
\tau = 1000 \times 0.0001
$$

$$
\tau = 0.1s
$$

---

# Prediction

The capacitor should charge much faster.

---

# Results Table

| Resistor | Time Constant |
|-----------|--------------|
| 10kΩ | 1.0s |
| 1kΩ | 0.1s |

---

# Understanding First-Order Systems

An RC circuit is called a:

**First-Order System**

because it contains only:

```text
One energy storage element
```

The capacitor.

Many real systems can be approximated by:

$$
G(s)=\frac{K}{\tau s + 1}
$$

where:

- $K$ = Gain
- $\tau$ = Time constant

We will revisit this equation many times throughout the course.

---

# MATLAB Exercise

Model the charging curve.

```matlab
R = 10000;

C = 100e-6;

tau = R*C;

t = 0:0.01:5;

Vc = 5*(1-exp(-t/tau));

plot(t,Vc,'LineWidth',2)

grid on

xlabel('Time (s)')
ylabel('Capacitor Voltage (V)')

title('RC Charging Curve')
```

---

# Expected Result

You should obtain the same exponential curve observed on the DSO Nano.

Compare:

- Theory
- MATLAB
- Oscilloscope

All three should be similar.

---

# Engineering Applications

RC circuits are used in:

## Filters

Remove noise.

---

## Sensors

Condition signals.

---

## Timing Circuits

Create delays.

---

## Power Electronics

Reduce voltage ripple.

---

## Control Systems

Model first-order dynamics.

---

# Knowledge Check

## Question 1

What is a time constant?

Answer:

```text
______________________
```

---

## Question 2

What voltage should the capacitor reach after one time constant when charging to 5V?

Answer:

```text
______________________
```

---

## Question 3

What happens when capacitance increases?

Answer:

```text
______________________
```

---

## Question 4

What happens when resistance increases?

Answer:

```text
______________________
```

---

## Question 5

Why is an RC circuit considered a first-order system?

Answer:

```text
______________________
```

---

# Common Mistakes

## Capacitor Connected Backwards

Check polarity carefully.

---

## Flat Line On Oscilloscope

Check:

- Probe location
- Ground connection
- Arduino code

---

## Time Constant Not Matching

Check:

- Actual resistor value
- Capacitor tolerance
- Scope time scale

---

# Troubleshooting Checklist

✅ Capacitor polarity correct

✅ Probe connected to Vc

✅ Probe ground connected to GND

✅ Arduino powered

✅ Sketch uploaded

✅ DSO Nano set to approximately 500 ms/div

✅ Trigger enabled

---

# Project Summary

In this project you learned:

✅ Capacitor operation

✅ Energy storage

✅ RC circuits

✅ Exponential charging

✅ Exponential discharging

✅ Time constants

✅ First-order systems

✅ DSO Nano transient measurements

✅ MATLAB modelling

These concepts provide the foundation for:

- Transfer functions
- Control systems
- Filters
- Converter output stages
- PI/PID tuning

---

# Next Project

**03_RLC_Circuits.md**

Topics:

- Inductors
- Resonance
- Ringing
- Natural Frequency
- Damping Ratio
- Second-Order Systems
- Oscillatory Response