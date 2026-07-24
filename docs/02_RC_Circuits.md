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

$$
E = \frac{1}{2}CV^2
$$

---

## The RC Circuit

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

---

## Capacitor Charging

$$
V_C(t) = V_F\left(1 - e^{-t/\tau}\right)
$$

---

## Capacitor Discharging

$$
V_C(t) = V_0 \, e^{-t/\tau}
$$

---

## Time Constant

$$
\tau = RC
$$

After one time constant ($t = \tau$) the capacitor reaches **63.2%** of its final value during charging.

---

## Charging Table

| Time | Charge Level |
|------|--------------|
| 1τ | 63.2% |
| 2τ | 86.5% |
| 3τ | 95.0% |
| 4τ | 98.2% |
| 5τ | 99.3% |

---

## MATLAB Simulation

```matlab
R = 10000;
C = 100e-6;
tau = R * C;

t = 0:0.001:5;

Vs = 3.3;   % ESP32 supply voltage (use 5.0 for Arduino Uno as backup)
Vc_charge = Vs * (1 - exp(-t / tau));
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

| R | C | Predicted τ |
|--------|--------|-------------|
| 10 kΩ | 100 µF | |
| 10 kΩ | 10 µF | |
| 1 kΩ | 100 µF | |

---

## Components Required

- ESP32 DevKit V1
- Breadboard and jumper wires
- 10 kΩ resistor
- 100 µF electrolytic capacitor
- OWON HDS272S Oscilloscope (recommended)
- DSO Nano Oscilloscope (compatible)

---

## Capacitor Polarity

Electrolytic capacitors are polarised.

```text
Long leg  → Positive (+)
Short leg → Negative (−)  ← connect to GND
```

---

## Calculate the Theoretical Time Constant

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
ESP32 GPIO18  (or Arduino Pin 9 as backup)
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
2. Connect a jumper wire from **ESP32 GPIO18** (or **Arduino pin 9** as backup) to one leg of the resistor.
3. Insert the **100 µF capacitor** so its **positive leg** is in the same row as the other resistor leg. This junction is $V_C$.
4. Connect a jumper wire from the **capacitor negative leg** to any **GND** pin on the ESP32.
5. Connect the **oscilloscope probe tip** to the $V_C$ junction.
6. Connect the **oscilloscope probe ground** to ESP32 GND.

---

### Wiring Checklist

Before uploading:

✅ Resistor leg in same row as ESP32 GPIO18 (or Arduino pin 9 as backup) jumper

✅ Capacitor positive leg in same row as other resistor leg

✅ Capacitor negative leg connected to GND

✅ Oscilloscope probe tip at Vc junction

✅ Oscilloscope probe ground at ESP32 GND

---

### ESP32 Code

```cpp
void setup()
{
    // Configure GPIO18 as a digital output.
    pinMode(18, OUTPUT);
}

void loop()
{
    // Set GPIO18 HIGH for 3 seconds → capacitor charges toward V_S.
    digitalWrite(18, HIGH);
    delay(3000);

    // Set GPIO18 LOW for 3 seconds → capacitor discharges toward 0 V.
    digitalWrite(18, LOW);
    delay(3000);
}
```

### Arduino Equivalent Code (backup)

```cpp
void setup()
{
    // Configure pin 9 as a digital output.
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
3.3V │          _______
     │       ╱
     │     ╱
     │   ╱
0V   └─────────────────
          Time →
```

---

### Observe

You should see the voltage rise slowly from 0 V toward $V_S$ (charging) then fall slowly back toward 0 V (discharging), repeatedly.

---

## Experiment 2 - Measure the Time Constant

### Objective

Verify the theoretical time constant by measuring the time for $V_C$ to reach $0.632 \times V_S$.

---

### Procedure

1. Observe the charging curve on the oscilloscope.
2. Identify the voltage level at $0.632 \times V_S$:
   - ESP32 ($V_S = 3.3\ \text{V}$): target $\approx 2.09\ \text{V}$ (primary)
   - Arduino Uno ($V_S = 5.0\ \text{V}$): target $\approx 3.16\ \text{V}$ (if using Arduino)
3. Measure the time from the start of charging to that point.

---

### Results Table

| Parameter | Theory | Measured |
|-----------|--------|---------|
| Resistance | 10 kΩ | |
| Capacitance | 100 µF | |
| Time Constant τ | 1.0 s | |
| Voltage at τ | 2.09 V (ESP32) / 3.16 V (Arduino backup) | |

---

## Experiment 3 - Change the Capacitor

Replace the 100 µF capacitor with a **10 µF** capacitor.

$$
\tau = RC = 10\,000 \times 10 \times 10^{-6} = 0.1\ \text{s}
$$

Adjust the horizontal scale to **50 ms/div**.

---

### Results Table

| Capacitor | Theoretical τ | Measured τ |
|-----------|--------------|-----------|
| 100 µF | 1.0 s | |
| 10 µF | 0.1 s | |

---

## Experiment 4 - Change the Resistor

Return the capacitor to **100 µF** and replace the 10 kΩ resistor with a **1 kΩ** resistor.

$$
\tau = RC = 1\,000 \times 100 \times 10^{-6} = 0.1\ \text{s}
$$

---

### Results Table

| Resistor | Theoretical τ | Measured τ |
|----------|--------------|-----------|
| 10 kΩ | 1.0 s | |
| 1 kΩ | 0.1 s | |

---

## MATLAB Comparison

```matlab
R = 10000;
C = 100e-6;
Vs = 3.3;                   % ESP32 (use 5.0 for Arduino Uno backup)
tau_theory = R * C;
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

---

## Troubleshooting

### Flat Line on Oscilloscope

Check:

✅ Probe tip connected to Vc junction

✅ Probe ground connected to ESP32 GND

✅ Code uploaded and ESP32 powered

---

### Troubleshooting Checklist

✅ Capacitor polarity correct

✅ Probe connected to Vc

✅ Probe ground connected to GND

✅ ESP32 (or Arduino backup) powered and sketch uploaded

✅ Horizontal scale set to approximately 500 ms/div for τ = 1 s

✅ Trigger enabled

---

## Knowledge Check

### Question 1

What is a time constant?

---

### Question 2

What voltage should the capacitor reach after one time constant when charging to 3.3 V?

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
