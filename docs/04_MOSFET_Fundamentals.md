# Project 04 - MOSFET Fundamentals and Electronic Switching

### Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md
- 03_RLC_Circuits.md

---

## Objective

In this project you will learn:

- What a MOSFET is
- How a MOSFET works
- How a microcontroller controls a MOSFET
- Why MOSFETs are used in power electronics
- How PWM and MOSFETs work together
- How to measure switching signals with the OWON HDS272S oscilloscope
- Why switching converters are efficient

This project marks the beginning of:

- Power electronics
- Motor drives
- Buck converters
- Boost converters
- DC-DC converters
- Inverters

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Explain MOSFET operation

✅ Identify Gate, Drain and Source

✅ Use a MOSFET as a switch

✅ Drive a MOSFET from a microcontroller

✅ Measure PWM on the MOSFET gate

✅ Explain switching losses

✅ Understand the foundation of power electronics

---

## Theory

### What is a MOSFET?

MOSFET stands for:

**Metal Oxide Semiconductor Field Effect Transistor**

A MOSFET behaves like an electronic switch controlled by voltage rather than by hand.

```text
Small Control Signal  →  Large Power Control
```

---

## Why MOSFETs Are Important

A microcontroller pin can safely supply only a small current (typically 20 mA).

Many loads require far more:

- DC motors: hundreds of milliamps to several amps
- LED strips: hundreds of milliamps
- Buck converters: several amps

A MOSFET allows the microcontroller to control these loads safely.

---

## MOSFET Symbol

Simplified N-Channel MOSFET:

```text
       Drain
         │
         │
Gate ────┤
         │
         │
       Source
```

---

## MOSFET Terminals

### Gate (G)

Control terminal. Equivalent to the switch handle.

Applying voltage here turns the MOSFET ON or OFF.

---

### Drain (D)

Current enters here from the load.

---

### Source (S)

Current exits here toward GND.

---

## How an N-Channel MOSFET Works

When:

$$
V_{GS} = 0\ \text{V}
$$

the MOSFET is **OFF** — no current flows from Drain to Source.

---

When:

$$
V_{GS} > V_{TH}
$$

and the gate voltage is high enough for low $R_{DS(on)}$, the MOSFET is **ON** — current flows freely from Drain to Source.

Where:

$$
V_{GS} = V_G - V_S
$$

---

## Logic Level MOSFETs

For microcontroller projects always use a **Logic Level MOSFET**.

These turn on fully with a 3.3 V or 5 V gate signal.

Recommended:

- IRLZ44N
- IRLZ34N
- IRL540N

Avoid the IRFZ44N for beginner microcontroller projects — it requires a higher gate voltage to turn on fully.

---

## Why a MOSFET is Efficient

Power loss is:

$$
P = V \cdot I
$$

When the MOSFET is **OFF**: $I \approx 0$, therefore $P \approx 0$.

When the MOSFET is **ON**: $V_{DS} \approx 0$, therefore $P \approx 0$.

This is why switching devices are far more efficient than linear regulators.

---

## IRLZ44N Pinout

For the IRLZ44N in a TO-220 package, viewed from the front (marked side):

```text
      _________
     |         |
     |         |
     |_________|

       │ │ │

       G D S
```

Always verify with the datasheet before wiring.

---

## MATLAB Simulation

Before building the circuit, simulate the gate waveform and average voltage to predict what you will observe.

### Simulate Gate PWM Waveforms

```matlab
f  = 490;                    % Arduino PWM frequency (Hz)
Ts = 1 / f;
duty_cycles = [0.25, 0.50, 0.75, 1.00];
Vs = 5;

t = 0:1e-6:4*Ts;

figure;
for i = 1:4
    D = duty_cycles(i);
    pwm = Vs * double(mod(t, Ts) < D * Ts);
    subplot(4,1,i);
    plot(t * 1e3, pwm, 'b', 'LineWidth', 1.5);
    yline(Vs * D, 'r--', sprintf('V_{AVG}=%.2fV', Vs*D));
    ylim([-0.5 6]); grid on;
    ylabel('V (V)');
    title(sprintf('D = %d%%', D*100));
end
xlabel('Time (ms)');
sgtitle('MOSFET Gate PWM - 490 Hz');
```

### Prediction Table

Record your predicted average voltages before measuring:

| PWM Value | Duty Cycle | Predicted $V_{AVG}$ |
|-----------|------------|---------------------|
| 64 | 25% | |
| 128 | 50% | |
| 192 | 75% | |
| 255 | 100% | |

---

## Components Required

- IRLZ44N MOSFET
- Arduino Uno or ESP32 DevKit V1
- LED
- 220 Ω resistor (for LED)
- 220 Ω resistor (for gate)
- Breadboard
- Jumper wires

Equipment:

- OWON HDS272S Oscilloscope (recommended)
- DSO Nano Oscilloscope (compatible)

---

## Project Circuit

The MOSFET is used as an electronic switch to control an LED.

The microcontroller drives the MOSFET gate. The MOSFET switches the LED current.

---

## Circuit Diagram

```text
5V
 │
220 Ω  (LED current-limiting resistor)
 │
LED anode (long leg)
LED cathode (short leg)
 │
Drain  (MOSFET)
Source (MOSFET) ──── GND

Gate (MOSFET)
 │
220 Ω  (gate resistor)
 │
Arduino Pin D9  (or ESP32 GPIO18)
```

---

## Why a Gate Resistor?

A small resistor (220 Ω) in series with the gate limits the current spike when the gate capacitance charges.

This reduces ringing on the gate signal and protects the microcontroller pin.

---

## Experiment 1 - MOSFET as an Electronic Switch

### Objective

Switch an LED ON and OFF using a MOSFET controlled by the Arduino, and measure the gate voltage on the oscilloscope.

---

### Step-by-Step Wiring

1. Insert the **IRLZ44N** into the breadboard with the three legs in separate rows. Identify Gate (G), Drain (D), and Source (S) from the pinout diagram above.
2. Connect a jumper wire from **Arduino GND** to the **Source** leg row.
3. Insert the **LED** so its **cathode (short leg)** is in the same row as the **Drain** leg.
4. Insert the **220 Ω LED resistor** so one leg is in the same row as the **LED anode (long leg)** and the other leg is in a new row.
5. Connect a jumper wire from the **top of the LED resistor** to the **Arduino 5V** pin.
6. Insert the **220 Ω gate resistor** so one leg is in the same row as the **Gate** leg and the other leg is in a new row.
7. Connect a jumper wire from the **top of the gate resistor** to **Arduino pin D9**.

The current path when the MOSFET is ON will be:

```text
5V → LED resistor → LED → Drain → Source → GND
```

The control path will be:

```text
D9 → Gate resistor → Gate
```

---

### Wiring Checklist

Before uploading:

✅ MOSFET Source connected to GND

✅ LED cathode (short leg) connected to Drain

✅ LED anode (long leg) connected to 220 Ω resistor

✅ 220 Ω LED resistor connected to 5V

✅ 220 Ω gate resistor between D9 and Gate

✅ Shared GND between Arduino and MOSFET Source

---

### Arduino Code

```cpp
void setup()
{
    // Configure pin 9 as a digital output to drive the MOSFET gate.
    pinMode(9, OUTPUT);
}

void loop()
{
    // Drive gate HIGH → MOSFET turns ON → current flows → LED ON.
    digitalWrite(9, HIGH);
    delay(1000);              // Hold ON for 1 second

    // Drive gate LOW → MOSFET turns OFF → no current → LED OFF.
    digitalWrite(9, LOW);
    delay(1000);              // Hold OFF for 1 second
}
```

### ESP32 Equivalent Code

```cpp
void setup()
{
    // Configure GPIO18 as a digital output.
    // Note: ESP32 outputs 3.3 V HIGH, which is sufficient for the IRLZ44N.
    pinMode(18, OUTPUT);
}

void loop()
{
    digitalWrite(18, HIGH);
    delay(1000);

    digitalWrite(18, LOW);
    delay(1000);
}
```

---

### Oscilloscope Settings — Gate Voltage

Connect the probe to the MOSFET Gate to observe the switching signal.

```text
Probe Tip  ──────► MOSFET Gate
Probe GND  ──────► Arduino GND (= MOSFET Source)
```

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 2 V/div | 2 V/div |
| Horizontal scale | 200 ms/div | 200 ms/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Expected Waveform

```text
5V  ────────
            │
            │
0V  ________│________
```

---

### Observe

The LED should flash:

```text
ON for 1 second

OFF for 1 second
```

On the oscilloscope you should see the gate voltage switching between 0 V and approximately 5 V (Arduino) or 3.3 V (ESP32).

---

### Record Measurements

| Parameter | Expected | Measured |
|-----------|----------|---------|
| Gate LOW | 0 V | |
| Gate HIGH | ~5 V (Arduino) or ~3.3 V (ESP32) | |

---

## Experiment 2 - PWM Controlled MOSFET

### Objective

Apply a PWM signal to the MOSFET gate and observe the switching waveform on the oscilloscope.

---

### Circuit

Same as Experiment 1.

---

### Arduino Code

```cpp
void setup()
{
    // No explicit pinMode needed; analogWrite() configures the pin automatically.
}

void loop()
{
    // Apply 50% duty cycle PWM to the MOSFET gate.
    // The MOSFET switches ON and OFF approximately 490 times per second.
    // The LED receives approximately 50% of the available power.
    analogWrite(9, 128);
}
```

### ESP32 Equivalent Code

```cpp
void setup()
{
    // Configure LEDC channel 0: 500 Hz, 8-bit resolution.
    ledcSetup(0, 500, 8);

    // Attach GPIO18 to channel 0.
    ledcAttachPin(18, 0);
}

void loop()
{
    // Set duty cycle to 128/255 ≈ 50%.
    ledcWrite(0, 128);
}
```

---

### Oscilloscope Settings — PWM Gate Signal

```text
Probe Tip  ──────► MOSFET Gate
Probe GND  ──────► Arduino GND
```

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 2 V/div | 2 V/div |
| Horizontal scale | 500 µs/div | 500 µs/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Expected Waveform

```text
5V  ─────      ─────
         │    │
         │    │
0V  _____│____│_____
```

---

### Observe

The LED should appear at medium brightness (not flashing visibly — the switching is too fast for the eye to detect).

On the oscilloscope you should see the PWM square wave on the gate.

---

### Record Measurements

| Parameter | Measured |
|-----------|---------|
| Frequency | |
| Duty Cycle | |
| Peak Voltage | |

---

## Experiment 3 - LED Brightness Control

### Objective

Step through four duty cycle levels and observe the effect on LED brightness.

---

### Circuit

Same as Experiments 1 and 2.

---

### Code

```cpp
void setup()
{
    // No explicit pinMode needed; analogWrite() configures the pin automatically.
}

void loop()
{
    // Step through four duty cycle levels with a 2-second pause at each.

    analogWrite(9, 64);    // ~25% duty cycle → LED dim
    delay(2000);

    analogWrite(9, 128);   // ~50% duty cycle → LED medium brightness
    delay(2000);

    analogWrite(9, 192);   // ~75% duty cycle → LED bright
    delay(2000);

    analogWrite(9, 255);   // 100% duty cycle → LED fully ON
    delay(2000);
}
```

---

### Observe

Watch the LED step through brightness levels:

```text
Dim  →  Medium  →  Bright  →  Fully ON
```

For each step, also observe the gate waveform on the oscilloscope and note how the ON time changes.

---

### Results Table

| PWM Value | Duty Cycle | Observed Brightness |
|-----------|------------|---------------------|
| 64 | 25% | |
| 128 | 50% | |
| 192 | 75% | |
| 255 | 100% | |

---

### Why PWM Works

Average voltage delivered to the load:

$$
V_{AVG} = D \cdot V_S
$$

At 50% duty cycle with a 5 V supply:

$$
V_{AVG} = 0.5 \times 5 = 2.5\ \text{V}
$$

The LED receives less average power and therefore appears dimmer.

---

## MATLAB Comparison

Compare your measured gate waveform against the ideal simulation.

```matlab
Vs = 5;                      % use 5.0 for Arduino or 3.3 for ESP32
f_theory   = 490;            % ideal Arduino PWM frequency (Hz)
f_measured = 490;            % replace with your measured frequency (Hz)
D_measured = 0.50;           % replace with your measured duty cycle (0–1)

Ts_t = 1 / f_theory;
Ts_m = 1 / f_measured;
t    = 0:1e-6:4*max(Ts_t, Ts_m);

pwm_theory   = Vs * double(mod(t, Ts_t) < 0.50 * Ts_t);
pwm_measured = Vs * double(mod(t, Ts_m) < D_measured * Ts_m);

figure;
subplot(2,1,1);
plot(t*1e3, pwm_theory,   'b--', 'LineWidth', 2, 'DisplayName', ...
    sprintf('Theory  f=%.0fHz D=50%%', f_theory));
hold on;
plot(t*1e3, pwm_measured, 'r',   'LineWidth', 2, 'DisplayName', ...
    sprintf('Measured f=%.0fHz D=%.0f%%', f_measured, D_measured*100));
grid on; legend; ylabel('Gate Voltage (V)');
title('Gate Waveform - Theory vs Measurement');

subplot(2,1,2);
D_vals = [0.25, 0.50, 0.75, 1.00];
Vavg_theory   = Vs .* D_vals;
Vavg_measured = Vs .* D_measured;
bar(D_vals*100, Vavg_theory, 0.4, 'b', 'DisplayName', 'Theory'); hold on;
scatter(D_measured*100, Vavg_measured, 100, 'r', 'filled', ...
    'DisplayName', 'Measured');
grid on; xlabel('Duty Cycle (%)'); ylabel('V_{AVG} (V)');
title('Average Voltage - Theory vs Measurement');
legend('Location','northwest');
```

### Reflection

- Does your measured frequency match 490 Hz?
- Does your measured $V_{AVG}$ match the theoretical value $D \times V_S$?
- Why might the measured average voltage differ slightly from theory?

---

## Troubleshooting

### LED Never Turns ON

Check:

✅ MOSFET pinout (Gate, Drain, Source in correct rows)

✅ LED polarity (cathode to Drain, anode toward 5V)

✅ Gate resistor connected between D9 and Gate

✅ Source connected to GND

---

### MOSFET Gets Hot

Check:

✅ Correct MOSFET type (IRLZ44N, not IRFZ44N)

✅ Source connected to GND (not floating)

✅ Load current within MOSFET rating

---

### No PWM Visible on Oscilloscope

Check:

✅ Probe tip on MOSFET Gate

✅ Probe ground on Arduino GND (same as MOSFET Source)

✅ Trigger type set to Edge, Rising

✅ Horizontal scale appropriate (500 µs/div for 490 Hz)

---

### Troubleshooting Checklist

✅ MOSFET orientation correct (G, D, S identified)

✅ Shared GND between controller and MOSFET Source

✅ Gate resistor in series between D9 and Gate

✅ LED resistor in series between 5V and LED anode

✅ Probe on Gate, probe ground on GND

✅ Correct trigger settings

---

## Laboratory Exercises

### Exercise 1

Replace the LED with a small DC motor (if available). Observe the gate waveform and note any difference compared to the resistive LED load.

> Note: Add a flyback diode (e.g. 1N4007) across the motor terminals (cathode toward 5V) to protect the MOSFET from inductive voltage spikes.

---

### Exercise 2

Connect a potentiometer to A0 and use its reading to control the MOSFET duty cycle in real time. Observe the gate waveform change on the oscilloscope as you turn the knob.

---

### Exercise 3

Measure the gate waveform at 25%, 50%, and 75% duty cycle. Record the ON time and OFF time for each and verify that $D = T_{ON} / T$.

---

## Knowledge Check

### Question 1

What does MOSFET stand for?

---

### Question 2

What are the three MOSFET terminals?

---

### Question 3

What controls whether the MOSFET is ON or OFF?

---

### Question 4

Why are MOSFETs used in power electronics instead of linear transistors?

---

### Question 5

Why can't a microcontroller pin drive a large motor directly?

---

### Question 6

Your simulation predicted $V_{AVG}$ = 2.5 V at 50% duty cycle but you measured 2.3 V. Give two physical reasons that could explain this.

---

## Project Summary

In this project you learned:

✅ MOSFET operation

✅ Gate, Drain and Source

✅ Electronic switching

✅ PWM-controlled switching

✅ MOSFET efficiency

✅ How a microcontroller controls larger loads

✅ Foundations of power electronics

These ideas are the building blocks for:

- Motor controllers
- Buck converters
- Boost converters
- Inverters
- Switching power supplies

---

## Next Project

```text
10_PWM_Motor_Control.md
```

Topics:

- DC Motor Fundamentals
- Open-Loop Speed Control
- PWM Motor Drives
- Motor Time Constants
- First-Order Motor Models
- Measuring Motor Response with the Oscilloscope
