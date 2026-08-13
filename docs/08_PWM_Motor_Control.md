# Project 10 - PWM Motor Control and First-Order System Dynamics

### Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md
- 03_RLC_Circuits.md
- 04_MOSFET_Fundamentals.md
- 05_DC_Chopper_Converters.md
- 06_Buck_Converter.md
- 07_Boost_Converter.md

---

## Objective

In this project you will learn:

- How DC motors work
- How PWM controls motor speed
- How a MOSFET controls motor power
- What motor inertia is
- Why motors do not respond instantly
- What a first-order dynamic system is
- How to estimate motor time constants

This project bridges the gap between electronics and control systems.

The motor will become our first real-world dynamic plant.

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Explain DC motor operation

✅ Control motor speed with PWM

✅ Drive a motor using a MOSFET

✅ Measure PWM signals using an oscilloscope

✅ Explain motor inertia

✅ Understand motor time constants

✅ Model a motor as a first-order system

---

## Theory

### What Is a DC Motor?

A DC motor converts electrical energy into mechanical energy.

When voltage is applied:

- Current flows through motor windings
- A magnetic field is created
- Torque is produced
- The shaft begins to rotate

---

## Simplified Motor Model

```text
Voltage → Current → Torque → Speed
```

---

## Why Doesn't a Motor Reach Full Speed Instantly?

Motors have mass and inertia.

Just like a car cannot instantly accelerate from 0 to 70 mph, a motor cannot instantly reach maximum speed.

Instead speed rises gradually, following a first-order exponential response similar to the RC circuit from Project 02.

---

## First-Order Motor Model

A DC motor can often be approximated by:

$$
G(s) = \frac{K}{\tau s + 1}
$$

Where:

- $K$ = System Gain
- $\tau$ = Motor Time Constant

---

## PWM Motor Control

PWM controls the average voltage applied to the motor:

$$
V_{AVG} = D \cdot V_S
$$

The motor receives less average voltage and therefore rotates more slowly.

---

## Why Use PWM Instead of a Resistor?

Resistor control wastes energy as heat.

PWM control is much more efficient because the MOSFET is either fully ON or fully OFF, minimising power loss.

---

## Why Is a Flyback Diode Needed?

Motors are inductive loads.

When current is interrupted, a high voltage spike can occur.

The flyback diode provides a path for this spike, protecting the controller, MOSFET, and other electronics.

---

## Circuit Diagram

```text
Battery (+)
    │
  Motor
    │──── Flyback diode (cathode toward Battery+, anode toward Drain)
    │
  Drain (MOSFET IRLZ44N)
  Source
    │
   GND

PWM Output (ESP32 GPIO18)
      │
    220 Ω gate resistor
      │
    Gate
```

---

## MATLAB Simulation

Before building the circuit, simulate the motor's first-order step response and PWM voltage to predict what you will observe.

### First-Order Step Response — Effect of Time Constant

```matlab
K      = 1;
tau_values = [0.2, 0.5, 1.0, 2.0];
labels = {'\tau=0.2s','\tau=0.5s','\tau=1.0s','\tau=2.0s'};

t = 0:0.01:10;

figure; hold on;
for i = 1:4
    G = tf(K, [tau_values(i), 1]);
    [y, ~] = step(G, t);
    plot(t, y, 'LineWidth', 2, 'DisplayName', labels{i});
end
yline(0.632, 'k--', '63.2%');
grid on;
xlabel('Time (s)'); ylabel('Normalised Speed');
title('First-Order Motor Model - Step Response');
legend('Location', 'southeast');
```

### Prediction Table

| Parameter | Predicted value |
|-----------|----------------|
| Motor time constant τ (s) | |
| Speed at 1τ (% of max) | 63.2% |
| Approximate settling time (5τ) | |

---

## Required Components

- ESP32 DevKit V1
- Breadboard and jumper wires
- IRLZ44N MOSFET
- DC Motor
- Flyback Diode (1N4001–1N4007)
- 220 Ω gate resistor
- External Battery Pack
- OWON HDS272S Oscilloscope (recommended)
- DSO Nano Oscilloscope (compatible)

---

## Experiment 1 - Full-Speed Motor Control

### Objective

Turn the motor fully ON and OFF and observe the gradual speed response.

---

### Step-by-Step Wiring

1. Insert the **IRLZ44N MOSFET** into the breadboard. Identify Gate (G), Drain (D), and Source (S).
2. Connect a jumper wire from **ESP32 GND** to the **MOSFET Source** row. Also connect the **battery negative** to this same GND row.
3. Insert the **220 Ω gate resistor** so one leg is in the **Gate** row and the other is in a new row.
4. Connect a jumper wire from **ESP32 GPIO18** to the top of the gate resistor.
5. Connect one motor terminal to the **MOSFET Drain** row.
6. Connect the other motor terminal to the **battery positive**.
7. Insert the **flyback diode** across the motor terminals: **cathode (banded end)** toward the battery positive terminal, **anode** toward the MOSFET Drain. This protects against inductive voltage spikes.

The current path when the MOSFET is ON:

```text
Battery (+) → Motor → Drain → Source → GND → Battery (−)
```

---

### Wiring Checklist

Before uploading:

✅ MOSFET Source connected to GND (shared with battery negative)

✅ Motor connected between battery positive and MOSFET Drain

✅ Flyback diode across motor (cathode toward battery+, anode toward Drain)

✅ Gate resistor between GPIO18 and MOSFET Gate

✅ Battery connected

---

### ESP32 Code

```cpp
void setup()
{
    // Configure GPIO18 as a digital output.
    // Note: ESP32 outputs 3.3 V HIGH, sufficient for the IRLZ44N.
    pinMode(18, OUTPUT);
}

void loop()
{
    // Drive gate HIGH → MOSFET ON → motor runs at full speed.
    digitalWrite(18, HIGH);
    delay(3000);              // Run for 3 seconds

    // Drive gate LOW → MOSFET OFF → motor decelerates.
    digitalWrite(18, LOW);
    delay(3000);              // Stop for 3 seconds
}
```

> **Arduino Uno:** replace GPIO18 with pin 9 and use `pinMode(9, OUTPUT)` / `digitalWrite(9, ...)`.

---

### Observe

Notice:

- Motor accelerates gradually when switched ON.
- Motor decelerates gradually when switched OFF.

Unlike an LED, the response is not instantaneous.

Record observations:

```text
Why does speed increase slowly?
________________________________

Why does speed decrease slowly?
________________________________
```

---

## Experiment 2 - PWM Speed Control

### Objective

Control motor speed using PWM and observe the gate waveform on the oscilloscope.

---

### Circuit

Same as Experiment 1.

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
    ledcWrite(0, 128);
}
```

> **Arduino Uno:** replace `ledcWrite(0, 128)` with `analogWrite(9, 128)` on pin 9.

---

### Oscilloscope Settings — Gate Signal

1. Hook the **CH1 probe tip** to the **MOSFET Gate**.
2. Clip the **CH1 probe ground** to any **GND pin** on the ESP32 (= MOSFET Source).

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

### Observe

The motor should rotate at a lower speed than full power.

---

### Measurements

| Measurement | Expected | Measured |
|-------------|----------|---------|
| Frequency | ~500 Hz | |
| Gate Voltage | ~3.3 V | |
| Duty Cycle | ~50% | |

---

## Experiment 3 - Speed Versus Duty Cycle

### Objective

Investigate the relationship between PWM duty cycle and motor speed.

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
    ledcWrite(0, 64);    // ~25% → low speed
    delay(3000);

    ledcWrite(0, 128);   // ~50% → medium speed
    delay(3000);

    ledcWrite(0, 192);   // ~75% → high speed
    delay(3000);

    ledcWrite(0, 255);   // 100% → maximum speed
    delay(3000);
}
```

> **Arduino Uno:** replace `ledcWrite(0, value)` with `analogWrite(9, value)` on pin 9.

---

### Results Table

| PWM Value | Duty Cycle | Relative Speed |
|-----------|------------|----------------|
| 64 | 25% | |
| 128 | 50% | |
| 192 | 75% | |
| 255 | 100% | |

---

## Experiment 4 - Motor Step Response

### Objective

Observe the motor's first-order dynamic response to a step change in PWM, and estimate the motor time constant.

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
    ledcWrite(0, 255);   // Step to full speed
    delay(5000);

    ledcWrite(0, 0);     // Step to zero
    delay(5000);
}
```

> **Arduino Uno:** replace `ledcWrite(0, value)` with `analogWrite(9, value)` on pin 9.

---

### Observe

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

### Estimating the Time Constant

Observe the motor start and estimate the time required to reach approximately 63.2% of final speed.

This estimated time is approximately $\tau$, the motor time constant.

---

### Record Your Model Parameters

| Parameter | Value |
|-----------|-------|
| Estimated τ (s) | |
| Gain K | 1 (normalised) |
| Transfer function G(s) | K / (τs + 1) |

> Keep this table. Projects 12, 13 and 14 will use this motor model as the plant for P, PI and PID controller design.

---

## MATLAB Comparison

Fit your measured step response to the first-order model using the time constant you estimated in Experiment 4.

```matlab
K            = 1;
tau_measured = 0.5;      % replace with your estimated tau (s)

t = 0:0.01:5 * tau_measured * 3;

tau_theory_low  = tau_measured * 0.7;
tau_theory_high = tau_measured * 1.3;

G_low  = tf(K, [tau_theory_low,  1]);
G_mid  = tf(K, [tau_measured,    1]);
G_high = tf(K, [tau_theory_high, 1]);

[y_low,  ~] = step(G_low,  t);
[y_mid,  ~] = step(G_mid,  t);
[y_high, ~] = step(G_high, t);

figure; hold on;
plot(t, y_low,  'b--', 'LineWidth', 1.5, 'DisplayName', ...
    sprintf('\\tau = %.2fs (low)', tau_theory_low));
plot(t, y_mid,  'r',   'LineWidth', 2.5, 'DisplayName', ...
    sprintf('\\tau = %.2fs (measured)', tau_measured));
plot(t, y_high, 'b--', 'LineWidth', 1.5, 'DisplayName', ...
    sprintf('\\tau = %.2fs (high)', tau_theory_high));
yline(0.632, 'k:', '63.2% threshold');
xline(tau_measured, 'r:', sprintf('\\tau = %.2fs', tau_measured));
grid on;
xlabel('Time (s)'); ylabel('Normalised Speed');
title('First-Order Motor Model - Measured \tau Fit');
legend('Location', 'southeast');
```

### Reflection

- Does the simulated curve match the shape you observed on the motor?
- What physical factors determine the motor time constant?
- How would a heavier load (more inertia) change τ?

---

## Troubleshooting

### Motor Doesn't Spin

Check:

✅ Battery connected and charged

✅ MOSFET pinout correct (G, D, S identified)

✅ Shared GND between ESP32 and battery negative

✅ Gate resistor connected between GPIO18 and Gate

---

### Controller Resets

Check:

✅ Flyback diode installed across motor terminals

✅ Shared power supply issues (use separate battery for motor)

---

### MOSFET Gets Hot

Check:

✅ Logic-level MOSFET (IRLZ44N, not IRFZ44N)

✅ Motor current within MOSFET rating

---

### PWM Not Visible

Check:

✅ Probe tip on MOSFET Gate

✅ Probe ground on ESP32 GND (= MOSFET Source)

✅ Trigger type set to Edge, Rising

✅ Horizontal scale appropriate (500 µs/div for ~500 Hz)

---

### Troubleshooting Checklist

✅ Flyback diode installed

✅ Battery connected

✅ MOSFET pinout verified

✅ Shared ground between controller and motor supply

✅ PWM observed on oscilloscope

---

## Knowledge Check

### Question 1

Why can't a motor reach full speed instantly?

---

### Question 2

What controls motor speed in this experiment?

---

### Question 3

Why is a flyback diode required?

---

### Question 4

Why is a MOSFET used instead of connecting the motor directly to the controller pin?

---

### Question 5

Why can a motor often be modelled as a first-order system?

---

### Question 6

You estimated τ = 0.5 s from the step response. How would you verify this estimate, and why does an accurate τ matter for designing the controller in Project 12?

---

## Project Summary

In this project you learned:

✅ DC motor fundamentals

✅ PWM speed control

✅ MOSFET motor driving

✅ Flyback diode protection

✅ First-order dynamic behaviour

✅ Motor time constants

✅ Open-loop control

✅ Oscilloscope motor measurements

The motor is the first real plant we will control.

In the next projects we will add feedback and begin building true control systems.

---

## Next Project

```text
12_P_Controller.md
```

Topics:

- Feedback
- Error Signals
- Open Loop vs Closed Loop Control
- Proportional Control
- Controller Gain
- Stability
