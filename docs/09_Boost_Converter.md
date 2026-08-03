# Project 09 - Boost Converter Fundamentals

### Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md
- 03_RLC_Circuits.md
- 04_MOSFET_Fundamentals.md
- 05_AC_DC_Rectifiers.md
- 06_DC_AC_Inverters.md
- 07_DC_Chopper_Converters.md
- 08_Buck_Converter.md

---

## Objective

In this project you will learn:

- What a Boost Converter is
- How a Boost Converter increases voltage
- How inductors store and transfer energy
- Why the output voltage can exceed the input voltage
- How duty cycle controls output voltage
- How to measure switching waveforms
- How Boost Converters compare to Buck Converters

This project introduces the second major non-isolated DC-DC converter topology.

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Explain Boost Converter operation

✅ Explain inductor energy storage

✅ Calculate ideal output voltage

✅ Understand duty cycle effects

✅ Measure PWM switching signals

✅ Measure output ripple

✅ Compare Buck and Boost Converters

---

## Introduction

A Boost Converter is a step-up DC-DC converter.

Examples:

```text
5 V → 12 V

12 V → 24 V

24 V → 48 V
```

Voltage conversion is achieved using PWM, MOSFET switching, and inductor energy storage — no AC input is required.

---

## Circuit Diagram

```text
5 V Supply
    │
   Inductor (100 µH)
    │
    ├──── Switch Node ──── Diode (1N5819) ──── Vout
    │                      (cathode toward Vout)    │
   MOSFET (IRLZ44N)                           100 µF capacitor
    │                                               │
   GND ─────────────────────────────────────────────┘
```

---

## Main Components

A Boost Converter contains:

1. Inductor — stores energy in a magnetic field
2. MOSFET — PWM-controlled switch
3. Diode — provides path for inductor current when MOSFET is OFF
4. Capacitor — smooths the output voltage
5. Load

---

## Operating Principle

### Phase 1 — MOSFET ON

Current path:

```text
Input → Inductor → MOSFET → GND
```

During this phase:

- Inductor current increases
- Magnetic energy is stored
- Diode is reverse biased (output capacitor supplies load)

### Phase 2 — MOSFET OFF

When the MOSFET switches OFF, the inductor generates a voltage that forces current through:

```text
Inductor → Diode → Output Capacitor → Load
```

The output voltage becomes higher than the input voltage.

---

## Why Can Output Voltage Exceed Input Voltage?

Recall:

$$
V_L = L\frac{di}{dt}
$$

An inductor resists sudden current change.

When the MOSFET turns OFF, the inductor produces a voltage that adds to the supply voltage.

Therefore:

```text
Output Voltage > Input Voltage
```

is possible.

---

## Ideal Boost Converter Equation

$$
V_{OUT} = \frac{V_{IN}}{1 - D}
$$

Where:

- $V_{OUT}$ = Output Voltage
- $V_{IN}$ = Input Voltage
- $D$ = Duty Cycle

### Example 1

$V_{IN} = 5\ \text{V}$, $D = 0.5$:

$$
V_{OUT} = \frac{5}{1 - 0.5} = 10\ \text{V}
$$

### Example 2

$V_{IN} = 5\ \text{V}$, $D = 0.75$:

$$
V_{OUT} = \frac{5}{1 - 0.75} = 20\ \text{V}
$$

---

## Important Practical Note

Real converters are not ideal.

Actual output voltage is lower because of:

- Diode voltage drop
- MOSFET losses
- Inductor resistance
- Switching losses

---

## MATLAB Simulation

Before building the circuit, simulate the ideal Boost Converter characteristics to predict what you will measure.

### Vout vs Duty Cycle — Nonlinear Gain

```matlab
Vin = 3.3;
D   = 0:0.001:0.95;
Vout_ideal = Vin ./ (1 - D);

D_exp    = [0.25, 0.50, 0.75];
Vout_exp = Vin ./ (1 - D_exp);

figure;
plot(D, Vout_ideal, 'b', 'LineWidth', 2); hold on;
scatter(D_exp, Vout_exp, 80, 'r', 'filled', 'DisplayName', 'Experiment points');
xline(0.75, 'r--', 'Max safe D for 5V in / 20V out');
yline(20, 'k:', '20V practical limit');
grid on;
xlabel('Duty Cycle'); ylabel('Output Voltage (V)');
title('Ideal Boost Converter - V_{IN} = 5V');
legend('Ideal V_{OUT}', 'Experiment points', 'Location', 'northwest');
ylim([0 30]);
```

### Simulate Inductor Current Waveform

```matlab
Vin  = 3.3;
D    = 0.5;
Vout = Vin / (1 - D);
L    = 100e-6;
fsw  = 500;
Ts   = 1 / fsw;
Iavg = 0.05;

delta_iL = Vin * D * Ts / L;

t_on  = linspace(0,    D*Ts, 100);
t_off = linspace(D*Ts, Ts,   100);

iL_on  = (Iavg - delta_iL/2) + Vin/L .* t_on;
iL_off = (Iavg + delta_iL/2) - (Vout - Vin)/L .* (t_off - D*Ts);

figure;
plot([t_on, t_off]*1e3, [iL_on, iL_off]*1e3, 'b', 'LineWidth', 2);
grid on;
xlabel('Time (ms)'); ylabel('Inductor Current (mA)');
title(sprintf('Boost Inductor Current - D=%.0f%%, L=%d\muH', D*100, L*1e6));
yline(Iavg*1e3, 'r--', sprintf('I_{avg} = %.0f mA', Iavg*1e3));
```

### Prediction Table

| PWM Value | Duty Cycle | Predicted V\_{OUT} (V) |
|-----------|------------|------------------------|
| 64 | 25% | |
| 128 | 50% | |
| 192 | 75% | |

> Note: At D = 75% the ideal equation predicts 20 V from a 5 V supply. Real output will be lower due to losses, but take care with your multimeter range.

---

## Components Required

- IRLZ44N MOSFET
- 1N5819 Schottky Diode
- 100 µH Inductor
- 100 µF Electrolytic Capacitor
- 220 Ω gate resistor
- ESP32 DevKit V1
- Breadboard and jumper wires
- OWON HDS272S Oscilloscope (recommended)
- DSO Nano Oscilloscope (compatible)

---

## Safety Notice

Begin with a 5 V input supply and low power loads.

If using ESP32 gate drive (~3.3 V), use a logic-level MOSFET with low $R_{DS(on)}$ specified at low $V_{GS}$, or use a gate driver.

Do not connect sensitive electronics directly to an untested converter output.

---

## Experiment 1 - Generate the Switching Signal

### Objective

Upload the PWM code and observe the gate switching signal on the oscilloscope before connecting the full converter circuit.

---

### Connections

1. Insert the **CH1 probe BNC** into CH1 on the OWON HDS272S.
2. Hook the **CH1 probe tip** onto **ESP32 GPIO18**.
3. Clip the **CH1 probe ground** to any **GND pin** on the ESP32.

```text
CH1 socket    ◄──── BNC connector
ESP32 GND     ◄──── CH1 probe ground
ESP32 GPIO18  ◄──── CH1 probe tip
```

No breadboard components needed — verify the gate signal before building the full converter.

---

### ESP32 Code

```cpp
void setup()
{
    // Configure LEDC channel 0: 500 Hz, 8-bit resolution.
    ledcSetup(0, 500, 8);
    ledcAttachPin(18, 0);
}

void loop()
{
    // Set duty cycle to 128/255 ≈ 50%.
    // This is the switching signal that will drive the MOSFET gate.
    ledcWrite(0, 128);
}
```

> **Arduino Uno:** replace `ledcWrite(0, 128)` with `analogWrite(9, 128)` on pin 9.

---

### Oscilloscope Settings

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 2 V/div | 2 V/div |
| Horizontal scale | 500 µs/div | 500 µs/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Expected Waveform

```text
3.3V  ─────      ─────
           │    │
           │    │
0V    _____│____│_____
```

---

### Measurements

| Parameter | Expected | Measured |
|-----------|----------|---------|
| Frequency | ~500 Hz | |
| Duty Cycle | ~50% | |
| Gate Voltage | ~3.3 V | |

---

## Experiment 2 - Build the Boost Converter and Vary Duty Cycle

### Objective

Build the full converter circuit and observe how duty cycle controls output voltage.

---

### Step-by-Step Wiring

1. Insert the **IRLZ44N MOSFET** into the breadboard. Identify Gate (G), Drain (D), and Source (S) from the pinout (see Project 04).
2. Connect a jumper wire from **ESP32 GND** to the **MOSFET Source** row.
3. Insert the **220 Ω gate resistor** so one leg is in the **Gate** row and the other is in a new row.
4. Connect a jumper wire from **ESP32 GPIO18** to the top of the gate resistor.
5. Insert the **100 µH inductor** so one leg connects to the **ESP32 3.3V supply** and the other leg connects to the **MOSFET Drain** row. This junction is the switch node.
6. Insert the **1N5819 diode** so its **anode** is in the switch node row and its **cathode (banded end)** is in a new row toward the output. This is the output diode.
7. Insert the **100 µF capacitor** so its **positive leg** is in the same row as the diode cathode (Vout) and its **negative leg** is in the GND row.
8. Hook the **CH1 probe tip** to the Vout node (diode cathode / capacitor positive).
9. Clip the **CH1 probe ground** to any **GND pin** on the ESP32.

The signal path will be:

```text
5V → Inductor → Switch Node → Diode (anode) → Diode (cathode) → Vout
                     │
                   MOSFET
                     │
                    GND
```

---

### Wiring Checklist

Before uploading:

✅ MOSFET Source connected to GND

✅ Inductor between 5V supply and MOSFET Drain (switch node)

✅ Diode anode at switch node, cathode toward Vout

✅ Capacitor positive leg at Vout, negative leg at GND

✅ Gate resistor between GPIO18 and MOSFET Gate

✅ Oscilloscope probe tip at Vout, probe GND at ESP32 GND

---

### ESP32 Code

```cpp
void setup()
{
    ledcSetup(0, 500, 8);
    ledcAttachPin(18, 0);
}

void loop()
{
    // Step through three duty cycles with a 3-second pause at each.
    // Expected Vout = Vin / (1 - D) at each step.

    ledcWrite(0, 64);    // ~25% duty cycle → Vout ≈ 4.4 V (ideal)
    delay(3000);

    ledcWrite(0, 128);   // ~50% duty cycle → Vout ≈ 6.6 V (ideal)
    delay(3000);

    ledcWrite(0, 192);   // ~75% duty cycle → Vout ≈ 13.2 V (ideal)
    delay(3000);
}
```

> **Arduino Uno:** replace `ledcWrite(0, value)` with `analogWrite(9, value)` on pin 9.

---

### Oscilloscope Settings — Output Voltage

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 2 V/div | 2 V/div |
| Horizontal scale | 1 s/div | 1 s/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Observe

The output voltage should step upward as duty cycle increases.

Measure the average DC output at each step with a multimeter.

---

### Results Table

| PWM Value | Duty Cycle | Expected V\_{OUT} (ideal) | Measured V\_{OUT} |
|-----------|------------|--------------------------|-------------------|
| 64 | 25% | 4.4 V | |
| 128 | 50% | 6.6 V | |
| 192 | 75% | 13.2 V | |

---

## Experiment 3 - Measure Output Ripple

### Objective

Observe output voltage ripple at the switching frequency.

---

### Connections

1. Hook the **CH1 probe tip** to the **Vout node** (diode cathode / capacitor positive).
2. Clip the **CH1 probe ground** to any **GND pin** on the ESP32.

> Use AC coupling to isolate the ripple from the DC offset.

---

### Oscilloscope Settings — Ripple

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 200 mV/div | 200 mV/div |
| Horizontal scale | 500 µs/div | 500 µs/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | AC | AC |

---

### Observe

The output should contain an average DC voltage plus a small ripple voltage.

Ripple occurs because the capacitor continuously charges and discharges.

---

## Comparing Buck and Boost Converters

| Property | Buck Converter | Boost Converter |
|----------|---------------|----------------|
| Purpose | Step Down Voltage | Step Up Voltage |
| Uses PWM | Yes | Yes |
| Uses MOSFET | Yes | Yes |
| Uses Inductor | Yes | Yes |
| Uses Capacitor | Yes | Yes |
| Output Voltage | Lower Than Input | Higher Than Input |
| Equation | $V_{OUT} = D \cdot V_{IN}$ | $V_{OUT} = V_{IN}/(1-D)$ |

---

## MATLAB Comparison

Overlay your measured output voltages against the ideal Boost Converter curve and compare with the Buck Converter results from Project 08.

```matlab
Vin = 3.3;

D_measured    = [0.25,  0.50,  0.75];
Vout_measured = [0.00,  0.00,  0.00];   % replace with your measured voltages (V)

D_ideal  = 0:0.001:0.95;
Vout_ideal = Vin ./ (1 - D_ideal);

figure; hold on;
plot(D_ideal, Vout_ideal, 'b--', 'LineWidth', 2, ...
    'DisplayName', 'Ideal: V_{OUT} = V_{IN}/(1-D)');
scatter(D_measured, Vout_measured, 80, 'r', 'filled', ...
    'DisplayName', 'Measured');
grid on;
xlabel('Duty Cycle'); ylabel('Output Voltage (V)');
title('Boost Converter - Ideal vs Measured');
legend('Location', 'northwest');
ylim([0 25]);

fprintf('%-8s %-12s %-12s %-14s %-12s\n', ...
    'D', 'V_ideal(V)', 'V_meas(V)', 'Ratio_ideal', 'Ratio_meas');
for i = 1:3
    V_ideal  = Vin / (1 - D_measured(i));
    M_ideal  = V_ideal / Vin;
    M_meas   = Vout_measured(i) / Vin;
    fprintf('%-8.2f %-12.2f %-12.2f %-14.2f %-12.2f\n', ...
        D_measured(i), V_ideal, Vout_measured(i), M_ideal, M_meas);
end
```

### Buck vs Boost Comparison

```matlab
Vin = 3.3;
D   = 0:0.001:0.95;

Vout_buck  = Vin .* D;
Vout_boost = Vin ./ (1 - D);

figure; hold on;
plot(D, Vout_buck,  'b', 'LineWidth', 2, 'DisplayName', 'Buck: D \cdot V_{IN}');
plot(D, Vout_boost, 'r', 'LineWidth', 2, 'DisplayName', 'Boost: V_{IN}/(1-D)');
yline(Vin, 'k--', sprintf('V_{IN} = %.0fV', Vin));
grid on;
xlabel('Duty Cycle'); ylabel('Output Voltage (V)');
title('Buck vs Boost - Voltage Conversion');
legend('Location', 'north');
ylim([0 20]);
```

### Reflection

- Is the measured Vout lower than ideal at all three duty cycles? Which duty cycle shows the largest absolute error?
- The Boost conversion ratio $M = V_{OUT}/V_{IN}$ becomes very sensitive to D near D = 1. Why is this a practical problem for control?
- How does the inductor current waveform shape differ between the Buck (Project 08) and Boost converters?

---

## Troubleshooting

### Output Voltage Does Not Increase

Check:

✅ Inductor connected between 5V supply and MOSFET Drain (not between Drain and GND)

✅ Diode orientation (anode at switch node, cathode toward Vout)

✅ MOSFET Source connected to GND

---

### Excessive Ripple

Check:

✅ Capacitor value (100 µF)

✅ Capacitor polarity (positive leg to Vout)

✅ Load not drawing excessive current

---

### No PWM Observed

Check:

✅ Gate resistor connected between GPIO18 and MOSFET Gate

✅ Code uploaded successfully

✅ CH1 probe tip on MOSFET Gate, CH1 probe ground on ESP32 GND

---

### Troubleshooting Checklist

✅ PWM present at MOSFET gate

✅ Inductor connected correctly (between supply and switch node)

✅ Diode orientation verified

✅ Capacitor polarity correct

✅ Output voltage measured

✅ Duty cycle affects output voltage

---

## Knowledge Check

### Question 1

Write the ideal Boost Converter equation.

---

### Question 2

Why can the output voltage exceed the input voltage?

---

### Question 3

What is the role of the diode in a Boost Converter?

---

### Question 4

What stores energy in a Boost Converter?

---

### Question 5

What happens when duty cycle increases?

---

### Question 6

The ideal Boost equation predicts Vout = 20 V at D = 0.75 with Vin = 5 V. Your measured value was lower. Apart from component losses, explain why the nonlinear gain curve makes the Boost Converter harder to control at high duty cycles than the Buck Converter.

---

## Project Summary

In this project you learned:

✅ Boost Converter operation

✅ Step-up voltage conversion

✅ Inductor energy storage

✅ PWM-controlled energy transfer

✅ Diode operation

✅ Output ripple

✅ Practical DC-DC conversion

You have now studied the two most important non-isolated converter topologies:

- Buck Converter
- Boost Converter

---

## Next Project

```text
07_DC_Chopper_Converters.md
```

Topics:

- Chopper Converter Fundamentals
- DC Motor Drives
- Average Voltage Control
- Quadrant Operation
- Buck and Boost Chopper Relationships
