# Project 02 - RC Circuits and Time Constants

### Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md
- 01_PWM_Fundamentals.md

---

## Objective

In this project you will learn:

- How capacitors work
- How capacitors charge and discharge
- What a time constant is
- How to calculate a time constant
- How to measure a time constant using the OWON HDS272S oscilloscope
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

## Learning Outcomes

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

## Theory

### What is a Capacitor?

A capacitor stores energy in an electric field.

Capacitor symbol:

```text
      ||
------||------
      ||
```

Unlike a resistor which dissipates energy, a capacitor stores energy and releases it later.

---

## Capacitor Energy

The energy stored in a capacitor is:

$$
E = \frac{1}{2}CV^2
$$

Where:

- $E$ = Energy (J)
- $C$ = Capacitance (F)
- $V$ = Voltage (V)

---

## The RC Circuit

An RC circuit contains one resistor and one capacitor.

```text
V_S
 │
 R
 │
 ├──── Vc ──── Probe Tip
 │
 C
 │
GND ──── Probe GND
```

We will observe $V_C$, the voltage across the capacitor.

---

## Why Does the Capacitor Not Charge Instantly?

The resistor limits current.

This causes the capacitor voltage to increase gradually, following a smooth exponential curve rather than an immediate jump.

---

## Capacitor Charging

When power is applied the capacitor voltage rises exponentially:

$$
V_C(t) = V_F\left(1 - e^{-t/\tau}\right)
$$

Where:

- $V_C(t)$ = Capacitor voltage at time $t$
- $V_F$ = Final voltage
- $\tau = RC$ = Time constant

---

## Capacitor Discharging

When the supply is removed the capacitor voltage falls exponentially:

$$
V_C(t) = V_0 \, e^{-t/\tau}
$$

Where:

- $V_0$ = Initial capacitor voltage

---

## Time Constant

The quantity:

$$
\tau = RC
$$

is called the **Time Constant**.

This is one of the most important equations in electronics and control engineering.

---

## Physical Meaning of Time Constant

After one time constant ($t = \tau$) the capacitor reaches:

$$
63.2\%
$$

of its final value during charging.

---

## Charging Table

| Time | Charge Level |
|------|--------------|
| 1τ | 63.2% |
| 2τ | 86.5% |
| 3τ | 95.0% |
| 4τ | 98.2% |
| 5τ | 99.3% |

After $5\tau$ the capacitor is considered fully charged.

---

## MATLAB Simulation

Before building the circuit, simulate the charging and discharging curves to predict what you will observe on the oscilloscope.

### Simulate Charging and Discharging

```matlab
R = 10000;
C = 100e-6;
tau = R * C;

t = 0:0.001:5;

% Charging: 0 to 5V
Vs = 5.0;   % use 5.0 for Arduino Uno, 3.3 for ESP32
Vc_charge = Vs * (1 - exp(-t / tau));

% Discharging: 5V to 0V
Vc_discharge = Vs * exp(-t / tau);

figure;
subplot(2,1,1);
plot(t, Vc_charge, 'b', 'LineWidth', 2);
yline(0.632*Vs, 'r--', sprintf('63.2%% = %.2fV', 0.632*Vs));
xline(tau, 'k--', sprintf('\\tau = %.1fs', tau));
grid on;
xlabel('Time (s)'); ylabel('Voltage (V)');
title('RC Charging — R=10k\Omega, C=100\muF');
ylim([0 1.1*Vs]);

subplot(2,1,2);
plot(t, Vc_discharge, 'r', 'LineWidth', 2);
yline(0.368*Vs, 'b--', sprintf('36.8%% = %.2fV', 0.368*Vs));
xline(tau, 'k--', sprintf('\\tau = %.1fs', tau));
grid on;
xlabel('Time (s)'); ylabel('Voltage (V)');
title('RC Discharging — R=10k\Omega, C=100\muF');
ylim([0 1.1*Vs]);
```

### Prediction Table

Record your predicted time constants before measuring:

| R | C | Predicted τ |
|--------|--------|-------------|
| 10 kΩ | 100 µF | |
| 10 kΩ | 10 µF | |
| 1 kΩ | 100 µF | |

---

## Components Required

- Arduino Uno or ESP32 DevKit V1
- Breadboard
- Jumper wires
- 10 kΩ resistor
- 100 µF electrolytic capacitor

Equipment:

- OWON HDS272S Oscilloscope (recommended)
- DSO Nano Oscilloscope (compatible)

---

## Capacitor Polarity

Electrolytic capacitors are polarised.

The negative lead is marked with a stripe on the body:

```text
Long leg  → Positive (+)
Short leg → Negative (−)  ← connect to GND
```

Always connect the negative lead to GND. Reversing polarity can damage the capacitor.

---

## Calculate the Theoretical Time Constant

Given:

$$
R = 10\,000\ \Omega, \quad C = 100\ \mu\text{F} = 100 \times 10^{-6}\ \text{F}
$$

$$
\tau = RC = 10\,000 \times 0.0001 = 1\ \text{s}
$$

---

## Experiment 1 - Observe Charging and Discharging

### Objective

Observe the capacitor charging and discharging curves on the oscilloscope.

---

### Circuit Diagram

```text
Arduino Pin D9  (or ESP32 GPIO18)
    │
   10 kΩ resistor
    │
    ├──── Vc ──── Probe Tip
    │
   100 µF capacitor  (positive leg up)
    │
   GND ──── Probe GND
```

---

### Step-by-Step Wiring

1. Insert the 10 kΩ resistor across the breadboard so each leg is in a different row.
2. Connect a jumper wire from **Arduino pin D9** to one leg of the resistor.
3. Insert the **100 µF capacitor** so its **positive leg (long leg)** is in the same row as the other resistor leg. This junction is $V_C$.
4. Connect a jumper wire from the **capacitor negative leg (short leg)** row to any **GND** pin on the Arduino.
5. Connect the **oscilloscope probe tip** to the $V_C$ junction (same row as the positive capacitor leg and the lower resistor leg).
6. Connect the **oscilloscope probe ground** to Arduino GND.

The signal path will be:

```text
D9 → Resistor → Vc (probe here) → Capacitor → GND
```

---

### Wiring Checklist

Before uploading:

✅ Resistor leg in same row as Arduino D9 jumper

✅ Capacitor positive leg (long) in same row as other resistor leg

✅ Capacitor negative leg (short) connected to GND

✅ Oscilloscope probe tip connected to Vc junction

✅ Oscilloscope probe ground connected to Arduino GND

---

### Arduino Code

```cpp
void setup()
{
    // Configure pin 9 as a digital output.
    pinMode(9, OUTPUT);
}

void loop()
{
    // Set pin 9 HIGH for 3 seconds → capacitor charges toward V_S.
    digitalWrite(9, HIGH);
    delay(3000);

    // Set pin 9 LOW for 3 seconds → capacitor discharges toward 0 V.
    digitalWrite(9, LOW);
    delay(3000);

    // The capacitor charges and discharges continuously.
}
```

### ESP32 Equivalent Code

```cpp
void setup()
{
    // Configure GPIO18 as a digital output.
    pinMode(18, OUTPUT);
}

void loop()
{
    digitalWrite(18, HIGH);
    delay(3000);

    digitalWrite(18, LOW);
    delay(3000);
}
```

---

### Oscilloscope Settings

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 1 V/div | 1 V/div |
| Horizontal scale | 500 ms/div | 500 ms/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Expected Charging Curve

```text
5V │          _______
   │       ╱
   │     ╱
   │   ╱
0V └─────────────────
        Time →
```

Notice the fast initial rise that slows as the capacitor approaches $V_S$.

---

### Expected Discharging Curve

```text
5V │╲
   │  ╲
   │    ╲
   │      ╲______
0V └─────────────────
        Time →
```

Notice the fast initial drop that slows as the capacitor approaches 0 V.

---

### Observe

Watch the oscilloscope display.

You should see the voltage:

```text
Rise slowly from 0 V toward V_S  (charging)

Fall slowly from V_S toward 0 V  (discharging)
```

repeatedly.

---

## Experiment 2 - Measure the Time Constant

### Objective

Verify the theoretical time constant by measuring the time for $V_C$ to reach $0.632 \times V_S$.

---

### Procedure

1. Observe the charging curve on the oscilloscope.
2. Identify the voltage level at $0.632 \times V_S$:
   - Arduino Uno ($V_S = 5.0\ \text{V}$): target $\approx 3.16\ \text{V}$
   - ESP32 ($V_S = 3.3\ \text{V}$): target $\approx 2.09\ \text{V}$
3. Measure the time from the start of charging to the point where $V_C$ reaches this voltage.
4. Record the measured time — this is your measured $\tau$.

---

### Expected Result

The measured time should be approximately:

$$
\tau \approx 1\ \text{s}
$$

---

### Results Table

| Parameter | Theory | Measured |
|-----------|--------|---------|
| Resistance | 10 kΩ | |
| Capacitance | 100 µF | |
| Time Constant τ | 1.0 s | |
| Voltage at τ | 3.16 V (Arduino) | |

---

## Experiment 3 - Change the Capacitor

### Objective

Observe how reducing capacitance reduces the time constant.

Replace the 100 µF capacitor with a **10 µF** capacitor.

---

### Calculate New Time Constant

$$
\tau = RC = 10\,000 \times 10 \times 10^{-6} = 0.1\ \text{s}
$$

---

### Oscilloscope Settings

Reduce the horizontal scale to suit the faster response:

| Setting | Value |
|---------|-------|
| Horizontal scale | 50 ms/div |

---

### Observe

The charging curve should be much faster than in Experiment 1.

---

### Results Table

| Capacitor | Theoretical τ | Measured τ |
|-----------|--------------|-----------|
| 100 µF | 1.0 s | |
| 10 µF | 0.1 s | |

---

## Experiment 4 - Change the Resistor

### Objective

Observe how reducing resistance reduces the time constant.

Return the capacitor to **100 µF** and replace the 10 kΩ resistor with a **1 kΩ** resistor.

---

### Calculate New Time Constant

$$
\tau = RC = 1\,000 \times 100 \times 10^{-6} = 0.1\ \text{s}
$$

---

### Observe

The charging curve should again be much faster than in Experiment 1, confirming that both R and C control the time constant.

---

### Results Table

| Resistor | Theoretical τ | Measured τ |
|----------|--------------|-----------|
| 10 kΩ | 1.0 s | |
| 1 kΩ | 0.1 s | |

---

## Understanding First-Order Systems

An RC circuit is called a **First-Order System** because it contains only one energy storage element (the capacitor).

Many real systems can be approximated by:

$$
G(s) = \frac{K}{\tau s + 1}
$$

Where:

- $K$ = Gain
- $\tau$ = Time constant

We will revisit this equation many times throughout the course.

---

## MATLAB Comparison

Overlay your measured time constant against the theoretical curve.

```matlab
R = 10000;
C = 100e-6;
Vs = 5.0;                   % use measured supply voltage (5.0 for Arduino, 3.3 for ESP32)
tau_theory = R * C;          % theoretical: 1.0s
tau_measured = 1.0;          % replace with your measured value (s)

t = 0:0.001:5;

Vc_theory   = Vs * (1 - exp(-t / tau_theory));
Vc_measured = Vs * (1 - exp(-t / tau_measured));

figure; hold on;
plot(t, Vc_theory,   'b--', 'LineWidth', 2, 'DisplayName', ...
    sprintf('Theory  \\tau = %.3fs', tau_theory));
plot(t, Vc_measured, 'r',   'LineWidth', 2, 'DisplayName', ...
    sprintf('Measured \\tau = %.3fs', tau_measured));
yline(0.632*Vs, 'k:', sprintf('63.2%% threshold = %.2fV', 0.632*Vs));
grid on;
xlabel('Time (s)'); ylabel('Capacitor Voltage (V)');
title('RC Charging — Theory vs Measurement');
legend('Location','southeast');
```

### Reflection

- Does your measured τ match the theoretical value?
- If not, what could explain the difference? (component tolerances, contact resistance, oscilloscope probe loading)
- How close is close enough for an engineering application?

---

## Troubleshooting

### Flat Line on Oscilloscope

Check:

✅ Probe tip connected to Vc junction (not to GND or the wrong row)

✅ Probe ground connected to Arduino GND

✅ Code uploaded and Arduino powered

---

### Capacitor Not Charging

Check:

✅ Capacitor polarity (positive leg toward resistor, negative leg to GND)

✅ Resistor in series between D9 and capacitor

---

### Time Constant Not Matching Theory

Check:

✅ Actual resistor value (read colour bands or measure with multimeter)

✅ Capacitor value marked on body

✅ Horizontal scale appropriate for the time constant being measured

---

### Troubleshooting Checklist

✅ Capacitor polarity correct

✅ Probe connected to Vc

✅ Probe ground connected to GND

✅ Controller powered and sketch uploaded

✅ Horizontal scale set to approximately 500 ms/div for τ = 1 s

✅ Trigger enabled

---

## Laboratory Exercises

### Exercise 1

Calculate and measure the time constant for R = 4.7 kΩ and C = 100 µF. Compare your result to the theoretical value.

---

### Exercise 2

Using R = 10 kΩ and C = 100 µF, calculate the voltage across the capacitor after 2τ and 3τ. Verify these values on the oscilloscope.

---

### Exercise 3

Sketch the expected charging curve for τ = 0.5 s on paper, then build the circuit and compare your sketch to the oscilloscope trace.

---

## Knowledge Check

### Question 1

What is a time constant?

---

### Question 2

What voltage should the capacitor reach after one time constant when charging to 5 V?

---

### Question 3

What happens to the time constant when capacitance increases?

---

### Question 4

What happens to the time constant when resistance increases?

---

### Question 5

Why is an RC circuit considered a first-order system?

---

### Question 6

Your MATLAB simulation predicted τ = 1.0 s but you measured τ = 1.15 s. Name two physical reasons that could explain this discrepancy.

---

## Project Summary

In this project you learned:

✅ Capacitor operation

✅ Energy storage

✅ RC circuits

✅ Exponential charging

✅ Exponential discharging

✅ Time constants

✅ First-order systems

✅ Oscilloscope transient measurements

✅ MATLAB modelling

These concepts provide the foundation for:

- Transfer functions
- Control systems
- Filters
- Converter output stages
- PI/PID tuning

---

## Next Project

```text
03_RLC_Circuits.md
```

Topics:

- Inductors
- Resonance
- Ringing
- Natural Frequency
- Damping Ratio
- Second-Order Systems
- Oscillatory Response
