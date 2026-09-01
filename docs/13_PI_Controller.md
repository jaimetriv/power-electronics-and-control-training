# Project 13 - PI Control and Eliminating Steady-State Error

### Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md
- 03_RLC_Circuits.md
- 04_MOSFET_Fundamentals.md
- 08_PWM_Motor_Control.md
- 11_System_Identification.md
- 12_P_Controller.md

---

## Objective

In this project you will learn:

- Why proportional control has limitations
- What steady-state error is
- What integral action is
- How a PI controller works
- How integral gain affects performance
- How PI controllers improve accuracy
- How PI controllers are used in industrial systems

The PI controller is one of the most important controllers in engineering because it can eliminate steady-state error.

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Explain integral action

✅ Explain steady-state error

✅ Implement a PI controller

✅ Tune proportional gain

✅ Tune integral gain

✅ Explain integral windup

✅ Understand why PI controllers are widely used

---

## Review of Proportional Control

$$
u(t) = K_P e(t)
$$

As the error becomes smaller, the correction also becomes smaller.

Eventually the correction is no longer large enough to eliminate the remaining error — this is steady-state error.

---

## Introducing Integral Action

The solution is to accumulate error over time.

The integral term is:

$$
\int e(t)\,dt
$$

This represents the total accumulated error.

Even a small persistent error will cause the integral to grow, eventually producing enough output to eliminate the error completely.

---

## PI Controller Equation

$$
u(t) = K_P e(t) + K_I \int e(t)\,dt
$$

Where:

- $u(t)$ = Controller Output
- $K_P$ = Proportional Gain
- $K_I$ = Integral Gain
- $e(t)$ = Error Signal

---

## PI Controller Block Diagram

```text
Reference → [−] → Error → Kp ──────────────┐
               ↑                             ├──→ Sum → Output → Plant → Output
               │           Error → Ki/s ────┘                      │
               └──────────────────────────────── Feedback ──────────┘
```

---

## Understanding Integral Windup

If a large error persists for a long time, the integral value becomes very large.

When conditions change the controller may overreact, causing overshoot, oscillation, or slow recovery.

This is called **integral windup**.

A simple solution is to limit the integral value:

```cpp
integral = constrain(integral, -1000, 1000);
```

This technique is called **anti-windup**.

---

## Simulink Simulation

Before building the circuit, simulate the closed-loop PI controller applied to the first-order motor model from Project 08.

This is a signal-only model — no Simscape electrical components are needed.

---

### Step 1 — Create a new Simulink model

1. In MATLAB, click **Home → New → Simulink Model**.
2. Save as `pi_controller.slx`.

---

### Step 2 — Add blocks

| Block | Library path | Quantity |
|-------|-------------|----------|
| Step | Simulink → Sources | 1 |
| Sum | Simulink → Math Operations | 2 |
| Gain | Simulink → Math Operations | 2 |
| Integrator | Simulink → Continuous | 1 |
| Transfer Fcn | Simulink → Continuous | 1 |
| Scope | Simulink → Sinks | 1 |

---

### Step 3 — Set block parameters

Step block:

| Parameter | Value |
|-----------|-------|
| Step time | `0` s |
| Initial value | `0` |
| Final value | `1` |

Sum block 1 (error junction — reference minus feedback):

| Parameter | Value |
|-----------|-------|
| List of signs | `+-` |

Gain block 1 (Kp):

| Parameter | Value |
|-----------|-------|
| Gain | `0.5` |

Gain block 2 (Ki):

| Parameter | Value |
|-----------|-------|
| Gain | `1.0` |

Sum block 2 (PI sum — proportional plus integral):

| Parameter | Value |
|-----------|-------|
| List of signs | `++` |

Transfer Fcn (motor plant `K/(τs+1)`):

| Parameter | Value |
|-----------|-------|
| Numerator | `[1]` |
| Denominator | `[0.5, 1]` |

> Replace `0.5` with your measured τ from Project 08 / Project 11.

---

### Step 4 — Wire the PI closed-loop

```text
Step → Sum1 (+) input
Sum1 output → Kp Gain → Sum2 (+) input 1
Sum1 output → Ki Gain → Integrator → Sum2 (+) input 2
Sum2 output → Transfer Fcn → Scope
Transfer Fcn output → Sum1 (−) input   [feedback path]
```

---

### Step 5 — Wiring checklist

✅ Step output connected to Sum1 positive (+) input

✅ Sum1 output branched to both Kp Gain and Ki Gain inputs

✅ Kp Gain output connected to Sum2 input 1

✅ Ki Gain output connected to Integrator input

✅ Integrator output connected to Sum2 input 2

✅ Sum2 output connected to Transfer Fcn input

✅ Transfer Fcn output connected to Scope

✅ Transfer Fcn output also connected back to Sum1 negative (−) input

✅ Sum1 signs set to `+-`, Sum2 signs set to `++`

---

### Step 6 — Configure simulation settings

1. Open **Modeling → Model Settings**.
2. Set **Solver** to `ode45`.
3. Set **Stop time** to `8` s.

---

### Step 7 — Run for each Ki value (fixed Kp = 0.5)

Change the Ki Gain block value, run, and note the response each time:

| Kp | Ki | Expected behaviour |
|----|----|--------------------|
| 0.5 | `0` | P only — steady-state error present |
| 0.5 | `0.5` | Slow integral action, error reducing |
| 0.5 | `1.0` | Faster convergence to reference |
| 0.5 | `2.0` | Fast, possible small overshoot |
| 0.5 | `5.0` | Fast convergence, likely overshoot |

For each run, confirm the output reaches 1.0 (zero steady-state error) for all Ki > 0.

---

### Step 8 — Wiring checklist before each run

✅ Ki Gain block value updated

✅ Kp Gain block still set to `0.5`

✅ Feedback wire still connected to Sum1 (−) input

✅ Scope showing Transfer Fcn output

---

### Prediction Table

<div class="result-block">
<table>
  <thead><tr><th>Kp</th><th>Ki</th><th>Predicted e<sub>ss</sub></th><th>Expected overshoot?</th></tr></thead>
  <tbody>
    <tr><td>0.5</td><td>0</td><td><input class="result-input" id="lab13-sim-ess-ki0" placeholder=""></td><td><input class="result-input" id="lab13-sim-os-ki0" placeholder="Yes / No"></td></tr>
    <tr><td>0.5</td><td>0.5</td><td><input class="result-input" id="lab13-sim-ess-ki05" placeholder=""></td><td><input class="result-input" id="lab13-sim-os-ki05" placeholder="Yes / No"></td></tr>
    <tr><td>0.5</td><td>1.0</td><td><input class="result-input" id="lab13-sim-ess-ki10" placeholder=""></td><td><input class="result-input" id="lab13-sim-os-ki10" placeholder="Yes / No"></td></tr>
    <tr><td>0.5</td><td>2.0</td><td><input class="result-input" id="lab13-sim-ess-ki20" placeholder=""></td><td><input class="result-input" id="lab13-sim-os-ki20" placeholder="Yes / No"></td></tr>
    <tr><td>0.5</td><td>5.0</td><td><input class="result-input" id="lab13-sim-ess-ki50" placeholder=""></td><td><input class="result-input" id="lab13-sim-os-ki50" placeholder="Yes / No"></td></tr>
  </tbody>
</table>
</div>

---

## Components Required

Same circuit as Project 12:

- ESP32 DevKit V1
- Breadboard and jumper wires
- Potentiometer (setpoint)
- IRLZ44N MOSFET
- DC Motor
- Flyback diode (1N4001–1N4007)
- 220 Ω gate resistor
- 2 × 10 kΩ resistors (back-EMF divider — already installed from Project 12)
- External battery pack
- OWON HDS272S Oscilloscope (recommended)
- DSO Nano Oscilloscope (compatible)

> Arduino Uno can be used as a backup controller if an ESP32 is not available.

---

## Experiment 1 - Build a Closed-Loop PI Motor Controller

### Objective

Implement a PI controller with back-EMF feedback closing the loop on the motor.

The potentiometer sets the speed reference. The back-EMF divider provides the feedback signal.

---

### Circuit

Same as Project 12 — back-EMF divider already in place:

```text
Battery (+)
    │
  Motor
    │──── Flyback diode (cathode toward Battery+)
    │
    ├──── 10 kΩ ──── GPIO35  (back-EMF feedback)
                │
              10 kΩ
                │
               GND

  Drain (MOSFET IRLZ44N)
  Source
    │
   GND

ESP32 GPIO18 (or Arduino Pin 9 as backup) ──── 220 Ω ──── Gate
Potentiometer centre pin ──── GPIO34
```

---

### Step-by-Step Wiring

If building fresh (circuit from Project 12 already in place, skip to the checklist):

1. Keep the MOSFET motor driver circuit from Project 12 intact.
2. Verify the **back-EMF voltage divider** is still connected: top 10 kΩ from motor positive terminal, midpoint to **GPIO35**, bottom 10 kΩ to **GND**.
3. Verify the **potentiometer** wiper is connected to **GPIO34**.
4. Confirm the **220 Ω gate resistor** connects **GPIO18** to the MOSFET gate.
5. Confirm **shared GND** between the ESP32, battery negative, and MOSFET source.

> Tip: If the Serial Monitor shows the feedback reading stuck at 0 or 4095, check the back-EMF divider connections — a loose wire on GPIO35 is the most common cause.

---

### Wiring Checklist

Before uploading:

✅ Motor circuit wired correctly (same as Project 12)

✅ Back-EMF divider connected to GPIO35 (ESP32) or A1 (Arduino backup)

✅ Potentiometer wiper connected to GPIO34 (ESP32) or A0 (Arduino backup)

✅ Shared GND between controller and battery

---

### ESP32 Code

```cpp
float Kp = 0.5;
float Ki = 1.0;

const int PWM_PIN   = 18;
const int REF_PIN   = 34;
const int FBK_PIN   = 35;
const float dt      = 0.05;
const float int_max = 500.0;

float integral = 0;

void setup()
{
    // Configure LEDC channel 0: 500 Hz, 8-bit resolution.
    ledcSetup(0, 500, 8);
    ledcAttachPin(PWM_PIN, 0);
    Serial.begin(115200);
}

void loop()
{
    int reference = analogRead(REF_PIN);   // 0–4095 on ESP32 12-bit ADC
    int feedback  = analogRead(FBK_PIN);

    // Scale 12-bit error to 8-bit PWM domain.
    float error = (reference - feedback) / 16.0;

    integral = integral + error * dt;
    integral = constrain(integral, -int_max, int_max);

    float output = Kp * error + Ki * integral;
    output = constrain(output, 0, 255);

    ledcWrite(0, (int)output);

    Serial.print("Ref: ");  Serial.print(reference);
    Serial.print("  Fbk: "); Serial.print(feedback);
    Serial.print("  Err8: "); Serial.print(error, 1);
    Serial.print("  Int: "); Serial.print(integral, 2);
    Serial.print("  PWM: "); Serial.println((int)output);

    delay(50);
}
```

### Arduino Equivalent Code (backup)

```cpp
float Kp = 0.5;
float Ki = 1.0;

const float dt      = 0.05;    // sample time (s) — matches delay(50)
const float int_max = 500.0;   // anti-windup limit

float integral = 0;

void setup()
{
    pinMode(9, OUTPUT);
    Serial.begin(9600);
}

void loop()
{
    int reference = analogRead(A0);   // 0–1023 on Arduino 10-bit ADC
    int feedback  = analogRead(A1);

    float error = reference - feedback;

    integral = integral + error * dt;
    integral = constrain(integral, -int_max, int_max);

    float output = Kp * error + Ki * integral;
    output = constrain(output, 0, 255);

    analogWrite(9, (int)output);

    Serial.print("Ref: ");  Serial.print(reference);
    Serial.print("  Fbk: "); Serial.print(feedback);
    Serial.print("  Err: "); Serial.print((int)error);
    Serial.print("  Int: "); Serial.print(integral, 2);
    Serial.print("  PWM: "); Serial.println((int)output);

    delay(50);
}
```

---

### What Is Happening?

The potentiometer sets the reference $r$.

The back-EMF divider measures actual motor speed (proxy) $y$.

The PI controller computes:

$$
e = r - y
$$

$$
u = K_P e + K_I \int e\,dt
$$

With the loop closed, the integral term drives the error toward zero — you should observe the feedback reading converge toward the reference in the Serial Monitor.

---

### Observe

With the loop closed:

1. Set a mid-range reference with the potentiometer. Observe the motor settle.
2. Watch the Serial Monitor — the feedback reading should converge toward the reference.
3. Gently load the motor shaft. Observe the integral term grow and the PWM increase to compensate.

---

### Serial Monitor

Open the Serial Monitor at **115200 baud** (ESP32) or **9600 baud** (Arduino backup).

Expected output:

```text
Ref: 2048  Fbk: 1820  Err8: 14.2  Int: 0.71  PWM: 14
Ref: 2048  Fbk: 1950  Err8: 6.1   Int: 1.02  PWM: 9
Ref: 2048  Fbk: 2040  Err8: 0.5   Int: 1.04  PWM: 1
```

The feedback value should converge toward the reference value as the integral term accumulates.

---

## Experiment 2 - Effect of Integral Gain

### Objective

Observe the effect of changing $K_I$.

Use the same closed-loop code from Experiment 1. Change only the Ki value.

---

### Test A

```cpp
Ki = 0;   // Pure P Controller
```

<div class="result-block">
  <textarea class="result-textarea" id="lab13-exp2-obsA" placeholder="Observation for Ki = 0..."></textarea>
</div>

---

### Test B

```cpp
Ki = 0.01;
```

<div class="result-block">
  <textarea class="result-textarea" id="lab13-exp2-obsB" placeholder="Observation for Ki = 0.01..."></textarea>
</div>

---

### Test C

```cpp
Ki = 0.05;
```

<div class="result-block">
  <textarea class="result-textarea" id="lab13-exp2-obsC" placeholder="Observation for Ki = 0.05..."></textarea>
</div>

---

### Test D

```cpp
Ki = 0.1;
```

<div class="result-block">
  <textarea class="result-textarea" id="lab13-exp2-obsD" placeholder="Observation for Ki = 0.1..."></textarea>
</div>

---

### Results Table

<div class="result-block">
<table>
  <thead><tr><th>Ki</th><th>Behaviour</th></tr></thead>
  <tbody>
    <tr><td>0</td><td><input class="result-input" id="lab13-exp2-beh-ki0" placeholder=""></td></tr>
    <tr><td>0.01</td><td><input class="result-input" id="lab13-exp2-beh-ki001" placeholder=""></td></tr>
    <tr><td>0.05</td><td><input class="result-input" id="lab13-exp2-beh-ki005" placeholder=""></td></tr>
    <tr><td>0.10</td><td><input class="result-input" id="lab13-exp2-beh-ki010" placeholder=""></td></tr>
  </tbody>
</table>
</div>

---

## Experiment 3 - Effect of Proportional Gain

Keep:

```cpp
Ki = 0.02;
```

Change Kp through the following values and record the behaviour.

<div class="result-block">
<table>
  <thead><tr><th>Kp</th><th>Behaviour</th></tr></thead>
  <tbody>
    <tr><td>0.1</td><td><input class="result-input" id="lab13-exp3-beh-kp01" placeholder=""></td></tr>
    <tr><td>0.5</td><td><input class="result-input" id="lab13-exp3-beh-kp05" placeholder=""></td></tr>
    <tr><td>1.0</td><td><input class="result-input" id="lab13-exp3-beh-kp10" placeholder=""></td></tr>
  </tbody>
</table>
</div>

---

## Oscilloscope Exercise

Observe the controller PWM output.

```text
Probe Tip  ──────► MOSFET Gate (ESP32 GPIO18 or Arduino Pin 9 as backup)
Probe GND  ──────► GND
```

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 2 V/div | 2 V/div |
| Horizontal scale | 500 µs/div | 500 µs/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Observe

As the reference changes, observe how the PWM duty cycle changes.

<div class="result-block">
  <textarea class="result-textarea" id="lab13-osc-obs" placeholder="Record your oscilloscope observations..."></textarea>
</div>

---

## Comparing P and PI Control

| Property | P Controller | PI Controller |
|----------|-------------|--------------|
| Simple | Yes | Yes |
| Fast Response | Good | Good |
| Steady-State Error | Present | Eliminated |
| Tuning Difficulty | Easy | Moderate |
| Integral Windup | No | Yes |

---

## MATLAB Comparison

Simulate the closed-loop PI response using your actual Kp and Ki values from Experiments 2 and 3.

```matlab
K   = 1;
tau = 0.5;       % your measured tau from Project 08 / Project 11 (s)
Kp  = 0.5;
Ki  = 1.0;

G    = tf(K, [tau, 1]);
C_P  = tf(Kp, 1);
C_PI = tf([Kp, Ki], [1, 0]);

T_P  = feedback(C_P  * G, 1);
T_PI = feedback(C_PI * G, 1);

t = 0:0.01:8;
[y_P,  ~] = step(T_P,  t);
[y_PI, ~] = step(T_PI, t);

figure; hold on;
plot(t, y_P,  'b--', 'LineWidth', 2, 'DisplayName', ...
    sprintf('P only  e_{ss}=%.1f%%', 100/(1+Kp*K)));
plot(t, y_PI, 'r',   'LineWidth', 2, 'DisplayName', 'PI  e_{ss}=0%');
yline(1.0, 'k--', 'Reference');
grid on;
xlabel('Time (s)'); ylabel('Normalised Output');
title('P vs PI - Steady-State Error Elimination');
legend('Location', 'southeast');

info_PI = stepinfo(T_PI);
fprintf('PI Settling time: %.2fs\n', info_PI.SettlingTime);
fprintf('PI Overshoot:     %.1f%%\n', info_PI.Overshoot);
```

### Reflection

- Does the PI simulation confirm zero steady-state error compared to P only?
- At what Ki did overshoot first appear in your experiments?
- How does the simulated settling time compare to what you observed on the motor?

---

## Troubleshooting

### Motor Doesn't Respond

Check:

✅ MOSFET wiring correct

✅ Battery connected

✅ Shared GND between controller and battery

✅ Flyback diode installed

---

### Output Saturates Immediately

Check:

✅ Reduce both Kp and Ki

✅ Check anti-windup limit in code

✅ Check potentiometer reading in Serial Monitor

---

### Oscillation Appears

Reduce Ki or Kp.

---

### Integral Grows Without Bound

Check:

✅ Anti-windup `constrain()` is present in code

✅ Sample time (delay) is consistent with dt constant

---

### Troubleshooting Checklist

✅ Motor circuit wired correctly (same as Project 12)

✅ Back-EMF divider connected to feedback ADC input

✅ Shared GND between controller and battery

✅ Potentiometer reading visible in Serial Monitor

✅ Feedback reading changes with motor speed in Serial Monitor

✅ PWM duty cycle visible on oscilloscope

✅ Anti-windup limit in code

✅ Integral drives feedback toward reference

---

<div class="result-actions">
  <button class="result-export-btn" data-lab="lab13">⬇ Export Results (JSON)</button>
  <button class="result-clear-btn" data-lab="lab13">✕ Clear All Results</button>
</div>

---

## Knowledge Check

### Question 1

What is steady-state error?

---

### Question 2

What does the integral term represent?

---

### Question 3

Write the PI controller equation.

---

### Question 4

Why does integral action eliminate steady-state error?

---

### Question 5

What is integral windup?

---

### Question 6

Your PI simulation shows overshoot at Ki = 5.0 but not at Ki = 1.0. Explain why increasing Ki too much causes overshoot, and how anti-windup helps.

---

## Project Summary

In this project you learned:

✅ Integral action

✅ PI control

✅ Closed-loop operation with back-EMF feedback

✅ Steady-state error

✅ Integral gain

✅ Integral windup

✅ Controller tuning

✅ PWM control through feedback

---

## Next Project

```text
14_PID_Controller.md
```

Topics:

- Derivative Action
- Overshoot Reduction
- Damping Improvement
- PID Controllers
- Controller Tuning
- Stability Improvements
