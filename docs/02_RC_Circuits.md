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

Vs = 3.3;   % ESP32 supply voltage
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
ESP32 GPIO18
    │
   10 kΩ resistor
    │
    ├──── Vc ──── CH1 probe tip
    │
   100 µF capacitor  (positive leg up)
    │
   GND ──── CH1 probe ground
```

---

### Breadboard Layout

```
       a      b      c      d      e
     ┌─────────────────────────────────────┐
 5   │ [●]   [ ]   [┐]   [ ]   [ ]       │ ← GPIO18 → a5, Resistor top c5
 6   │ [ ]   [ ]   [│]   [ ]   [ ]       │
 7   │ [ ]   [ ]   [│]   [ ]   [ ]       │  10 kΩ resistor (c5–c8)
 8   │ [ ]   [ ]   [┘]   [ ]   [▲]       │ ← Vc junction: c8 = Cap+ e8  ← CH1 probe tip
 9   │ [ ]   [ ]   [ ]   [ ]    │         │  100 µF cap body
10   │ [ ]   [ ]   [ ]   [ ]   [▼]       │ ← Cap− at e10 → GND
     └─────────────────────────────────────┘
```

**Row 8 is the Vc junction.** All holes in row 8 are internally linked, so `c8` (resistor bottom) and `e8` (cap positive) are at the same voltage. Connect the CH1 probe tip here.

> Electrolytic cap polarity: **long leg = positive (+)** in row 8; **short leg = negative (−)** in row 10.

---

### Step-by-Step Wiring

1. Insert the **10 kΩ resistor** vertically: one leg in **row 5, column c**, other in **row 8, column c**.
2. Connect a jumper wire from **ESP32 GPIO18** to **row 5, column a**.
3. Insert the **100 µF electrolytic capacitor** vertically: **long leg (positive)** in **row 8, column e**, **short leg (negative)** in **row 10, column e**.
4. Connect a jumper wire from **row 10, column e** to any **GND pin** on the ESP32.
5. Hook the **CH1 probe tip** to any hole in **row 8** (the Vc junction).
6. Clip the **CH1 probe ground** to any **GND pin** on the ESP32.

---

### Wiring Checklist

Before uploading:

✅ Resistor leg in same row as GPIO18 jumper (row 5)

✅ Capacitor positive leg in same row as resistor bottom (row 8 = Vc)

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

> **Arduino Uno:** replace GPIO18 with pin 9 and use `pinMode(9, OUTPUT)` / `digitalWrite(9, ...)` instead of LEDC.

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
2. Identify the target voltage at $0.632 \times V_S = 0.632 \times 3.3 \approx 2.09\ \text{V}$.
3. Measure the time from the start of charging to the point where $V_C$ reaches 2.09 V.

---

### Results Table

| Parameter | Theory | Measured |
|-----------|--------|---------|
| Resistance | 10 kΩ | |
| Capacitance | 100 µF | |
| Time Constant τ | 1.0 s | |
| Voltage at τ | 2.09 V (= 0.632 × 3.3 V) | |

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

## From Time Domain to Frequency Domain

The time constant and cutoff frequency describe the same RC circuit from two different angles:

$$
\tau = RC \qquad \Longleftrightarrow \qquad f_c = \frac{1}{2\pi RC} = \frac{1}{2\pi\tau}
$$

Experiments 1–4 used **10 kΩ + 100 µF** giving τ = 1 s and $f_c \approx 0.16$ Hz — far too slow to sweep with a signal generator.

For Experiments 5 and 6, switch to **10 kΩ + 100 nF** (the 100 nF ceramic capacitor from the Beginner Parts Kit):

$$
\tau = 10000 \times 100 \times 10^{-9} = 1\ \text{ms} \qquad f_c = \frac{1}{2\pi \times 0.001} \approx 159\ \text{Hz}
$$

This places the cutoff inside the OWON signal generator’s practical range.

---

## Experiment 5 - Low-Pass Filter Frequency Response

### Objective

Measure the frequency response of an RC low-pass filter using the OWON signal generator.
Verify that the measured cutoff frequency matches the calculated value $f_c \approx 159$ Hz.

---

### Components

- 10 kΩ resistor
- **100 nF ceramic capacitor** (non-polarised — the 100 nF from the Beginner Parts Kit, **not** the electrolytic used in Experiments 1–4)

---

### Circuit

```text
         10 kΩ
VIN ─────┤R├─────┬──── VOUT (CH2 probe tip)
                 │
               100 nF
                 │
GND ─────────────┘──── probe ground
```

Output is across the capacitor. Low frequencies pass; high frequencies are attenuated.

---

### Breadboard Layout

```
       a      b      c      d      e
     ┌─────────────────────────────────────┐
 5   │ [●]   [ ]   [┐]   [ ]   [ ]       │ ← GEN OUT → a5, Resistor top c5 (VIN)
 6   │ [ ]   [ ]    │    [ ]   [ ]       │  10 kΩ resistor body
 7   │ [ ]   [ ]   [┘]   [ ]   [┐]       │ ← Resistor bottom c7 = Cap top e7 = VOUT (same row)
 8   │ [ ]   [ ]   [ ]   [ ]   [┘]       │ ← Cap bottom e8 → GND
     └─────────────────────────────────────┘
```

Row 7 is the VOUT junction (`c7` and `e7` are the same row — no jumper needed).

---

### Signal Generator and Probe Setup

1. Configure the OWON signal generator: **Sine, 2 Vpp, 0 V offset**.
2. Connect **GEN OUT** to row 5 (VIN). Connect **GEN GND** to the GND rail.
3. **CH1 probe tip** → row 5 (VIN). CH1 ground → GND rail.
4. **CH2 probe tip** → row 7 (VOUT). CH2 ground → GND rail.

---

### Procedure and Measurements

Change the generator frequency for each row. Record CH1 Vpp (input) and CH2 Vpp (output).

| Frequency | CH1 Vpp (VIN) | CH2 Vpp (VOUT) | Ratio VOUT/VIN |
|-----------|--------------|---------------|----------------|
| 10 Hz | | | |
| 100 Hz | | | |
| 159 Hz | | | |
| 500 Hz | | | |
| 1 kHz | | | |
| 10 kHz | | | |

At $f_c \approx 159$ Hz the ratio should be approximately **0.707** (−3 dB).

---

## Experiment 6 - High-Pass Filter

### Objective

Swap R and C to form a high-pass filter.
Show that the same component values give the same cutoff frequency but opposite attenuation behaviour.

---

### Circuit

Swap the positions of R and C. Output is now across the resistor:

```text
         100 nF
VIN ─────┤C├─────┬──── VOUT (CH2 probe tip)
                 │
               10 kΩ
                 │
GND ─────────────┘──── probe ground
```

High frequencies pass; low frequencies are attenuated. Cutoff frequency is unchanged:

$$
f_c = \frac{1}{2\pi RC} \approx 159\ \text{Hz}
$$

---

### Breadboard Layout

```
       a      b      c      d      e
     ┌─────────────────────────────────────┐
 5   │ [●]   [ ]   [┐]   [ ]   [ ]       │ ← GEN OUT → a5, Cap top c5 (VIN)
 6   │ [ ]   [ ]   [┘]   [ ]   [┐]       │ ← Cap bottom c6 = Resistor top e6 = VOUT (same row)
 7   │ [ ]   [ ]   [ ]   [ ]    │         │  10 kΩ resistor body
 8   │ [ ]   [ ]   [ ]   [ ]   [┘]       │ ← Resistor bottom e8 → GND
     └─────────────────────────────────────┘
```

Row 6 is the VOUT junction. Compare this layout to Experiment 5 — only R and C positions are swapped.

---

### Signal Generator and Probe Setup

Same generator settings as Experiment 5.

1. Connect **GEN OUT** to row 5 (VIN). Connect **GEN GND** to GND rail.
2. **CH1 probe tip** → row 5 (VIN). CH1 ground → GND rail.
3. **CH2 probe tip** → row 6 (VOUT). CH2 ground → GND rail.

---

### Procedure and Measurements

| Frequency | CH1 Vpp (VIN) | CH2 Vpp (VOUT) | Ratio VOUT/VIN |
|-----------|--------------|---------------|----------------|
| 10 Hz | | | |
| 100 Hz | | | |
| 159 Hz | | | |
| 500 Hz | | | |
| 1 kHz | | | |
| 10 kHz | | | |

At $f_c \approx 159$ Hz the ratio should again be approximately **0.707**.

---

### LP vs HP Comparison

| Frequency | LP Ratio (Exp 5) | HP Ratio (Exp 6) | Which filter passes? |
|-----------|-----------------|-----------------|----------------------|
| 10 Hz | | | |
| 159 Hz | ≈0.707 | ≈0.707 | Both at cutoff |
| 1 kHz | | | |
| 10 kHz | | | |

Below $f_c$: LP ratio → 1, HP ratio → 0. Above $f_c$: opposite.

---

## MATLAB Filter Frequency Response

Use this script to plot the theoretical LP and HP frequency response and overlay your measured data points from Experiments 5 and 6.

```matlab
R = 10000;
C = 100e-9;
fc = 1 / (2 * pi * R * C);      % cutoff frequency (~159 Hz)

% Transfer functions (Control System Toolbox)
LP = tf([1/(R*C)], [1, 1/(R*C)]);
HP = tf([1,    0], [1, 1/(R*C)]);

f = logspace(1, 5, 400);         % 10 Hz to 100 kHz, log-spaced

[mag_LP, ~] = bode(LP, 2*pi*f);
[mag_HP, ~] = bode(HP, 2*pi*f);

figure; hold on;
semilogx(f, squeeze(mag_LP), 'b-', 'LineWidth', 2, 'DisplayName', 'LP theory');
semilogx(f, squeeze(mag_HP), 'r-', 'LineWidth', 2, 'DisplayName', 'HP theory');
xline(fc, 'k--', sprintf('f_c = %.0f Hz', fc), 'LabelVerticalAlignment', 'bottom');
yline(0.707, 'k:', '0.707  (-3 dB)');
xlabel('Frequency (Hz)'); ylabel('|V_{OUT}/V_{IN}|');
title(sprintf('RC Filter Frequency Response — R=%dk\\Omega, C=%dnF', R/1e3, C*1e9));
legend('Location', 'west'); grid on;
ylim([0 1.1]); xlim([10 1e5]);

% --- Replace NaN values with your measured ratios from the tables ---
f_pts   = [10,  100,  159,  500,  1000, 10000];
LP_meas = [NaN, NaN, NaN, NaN, NaN, NaN];   % VOUT/VIN from Experiment 5
HP_meas = [NaN, NaN, NaN, NaN, NaN, NaN];   % VOUT/VIN from Experiment 6

scatter(f_pts, LP_meas, 80, 'b', 'filled', 'DisplayName', 'LP measured');
scatter(f_pts, HP_meas, 80, 'r', 'filled', 'DisplayName', 'HP measured');
legend('Location', 'west');
```

### What to observe

- Your measured LP points should lie on the blue curve; HP points on the red curve.
- At 159 Hz both curves cross at 0.707 — your measurements should confirm this.
- The LP slope above $f_c$ is −20 dB/decade; the HP slope below $f_c$ is +20 dB/decade.
- Any systematic offset between theory and measurement is usually caused by component tolerance (resistors ±1–5%, capacitors ±10–20%).

---

## MATLAB Comparison

```matlab
R = 10000;
C = 100e-6;
Vs = 3.3;                   % ESP32 supply voltage
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

✅ ESP32 powered and sketch uploaded

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

✅ RC low-pass filter frequency response

✅ RC high-pass filter

✅ Cutoff frequency measurement and verification

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
