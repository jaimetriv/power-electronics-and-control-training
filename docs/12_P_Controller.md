# Project 12 - Proportional Control (P Control) and Feedback Systems

---

## Objective

In this project you will learn:

- What feedback is
- What a control system is
- The difference between open-loop and closed-loop control
- What an error signal is
- How a proportional controller works
- How proportional gain affects system behaviour
- The limitations of proportional control

This project introduces the foundations of modern control engineering.

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Explain feedback

✅ Explain open-loop control

✅ Explain closed-loop control

✅ Calculate an error signal

✅ Implement a proportional controller

✅ Tune proportional gain

✅ Understand steady-state error

✅ Explain why higher gain is not always better

---

## Theory

### What is a Control System?

A control system attempts to make a system behave in a desired manner.

Every control system has:

```text
Reference → Controller → Plant → Output
```

---

## Open-Loop Control

Open-loop control means no feedback.

The controller sends commands without measuring the result.

Example:

```text
Apply 50% PWM to a motor
```

The controller assumes the motor behaves correctly.

---

## Open-Loop Block Diagram

```text
Controller → Plant → Output
```

---

## Problems with Open-Loop Control

Suppose a motor is running at 500 RPM and an extra load is applied.

The speed drops to 300 RPM.

The controller does not know this has happened.

Therefore no correction occurs.

---

## Closed-Loop Control

Closed-loop control uses feedback.

The output is measured and returned to the controller.

The controller continuously compares the desired value with the actual value.

---

## Closed-Loop Block Diagram

```text
Reference → [−] → Controller → Plant → Output
               ↑                          │
               └──────── Feedback ────────┘
```

---

## Error Signal

$$
e(t) = r(t) - y(t)
$$

Where:

- $e(t)$ = Error Signal
- $r(t)$ = Reference Signal
- $y(t)$ = Output Signal

### Example

$r = 100$, $y = 70$:

$$
e = 100 - 70 = 30
$$

---

## Closed-Loop Transfer Function

For a proportional controller $C(s) = K_P$ applied to a first-order plant $G(s) = K/(\tau s + 1)$, the closed-loop transfer function is:

$$
T(s) = \frac{C(s)G(s)}{1 + C(s)G(s)} = \frac{K_P K / (\tau s + 1)}{1 + K_P K / (\tau s + 1)}
$$

Multiplying numerator and denominator by $(\tau s + 1)$:

$$
T(s) = \frac{K_P K}{\tau s + 1 + K_P K} = \frac{K_P K}{\tau s + (1 + K_P K)}
$$

Dividing by $(1 + K_P K)$:

$$
\boxed{T(s) = \frac{K_P K / (1 + K_P K)}{\dfrac{\tau}{1 + K_P K}\,s + 1}}
$$

This is still a first-order system, but with:

- Closed-loop DC gain: $\dfrac{K_P K}{1 + K_P K} < 1$
- Closed-loop time constant: $\dfrac{\tau}{1 + K_P K}$ (faster than open loop)

### Steady-State Error

The DC gain of $T(s)$ is less than 1, so the output never fully reaches the reference.

The steady-state error for a unit step input is:

$$
e_{ss} = 1 - \frac{K_P K}{1 + K_P K} = \frac{1}{1 + K_P K}
$$

With $K = 1$:

$$
\boxed{e_{ss} = \frac{1}{1 + K_P}}
$$

Higher $K_P$ reduces steady-state error but never eliminates it entirely.

---

## Proportional Control Equation

$$
u(t) = K_P e(t)
$$

Where:

- $u(t)$ = Controller Output
- $K_P$ = Proportional Gain
- $e(t)$ = Error Signal

---

## Understanding Gain

### Small Gain Example

$K_P = 0.5$, $e = 20$:

$$
u = 0.5 \times 20 = 10
$$

The controller responds gently.

### Large Gain Example

$K_P = 5$, $e = 20$:

$$
u = 5 \times 20 = 100
$$

The controller responds aggressively.

---

## Steady-State Error

One limitation of a proportional controller is that the output often remains slightly different from the reference.

Example:

$r = 100$, $y = 95$:

$$
e = 100 - 95 = 5
$$

The controller gets close to the target but does not completely eliminate the error.

---

## Simulink Simulation

Before building the circuit, simulate the closed-loop P controller applied to the first-order motor model from Project 08.

This is a signal-only model — no Simscape electrical components are needed.

---

### Step 1 — Create a new Simulink model

1. In MATLAB, click **Home → New → Simulink Model**.
2. Save as `p_controller.slx`.

---

### Step 2 — Add blocks

| Block | Library path | Quantity |
|-------|-------------|----------|
| Step | Simulink → Sources | 1 |
| Sum | Simulink → Math Operations | 1 |
| Gain | Simulink → Math Operations | 1 |
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

Sum block:

| Parameter | Value |
|-----------|-------|
| List of signs | `+-` |

Gain block (Kp):

| Parameter | Value |
|-----------|-------|
| Gain | `0.5` |

> You will change this value for each test run.

Transfer Fcn (motor plant `K/(τs+1)`):

| Parameter | Value |
|-----------|-------|
| Numerator | `[1]` |
| Denominator | `[0.5, 1]` |

> Replace `0.5` with your measured τ from Project 08 / Project 11.

---

### Step 4 — Wire the closed-loop

```text
Step → Sum (+) input
Sum output → Gain (Kp) → Transfer Fcn → Scope
Transfer Fcn output → Sum (−) input   [feedback path]
```

The feedback wire runs from the Transfer Fcn output back to the negative (−) input of the Sum block.

---

### Step 5 — Wiring checklist

✅ Step output connected to Sum positive (+) input

✅ Sum output connected to Gain input

✅ Gain output connected to Transfer Fcn input

✅ Transfer Fcn output connected to Scope

✅ Transfer Fcn output also connected back to Sum negative (−) input

✅ Sum block signs set to `+-`

---

### Step 6 — Configure simulation settings

1. Open **Modeling → Model Settings**.
2. Set **Solver** to `ode45`.
3. Set **Stop time** to `5` s.

---

### Step 7 — Run for each Kp value

Change the Gain block value, run, and note the response each time:

| Kp | Gain block value | Expected behaviour |
|----|-----------------|--------------------|
| 0.5 | `0.5` | Slow, large steady-state error |
| 1.0 | `1.0` | Moderate response |
| 2.0 | `2.0` | Faster, less error |
| 5.0 | `5.0` | Fast, small error |
| 10.0 | `10.0` | Very fast, minimal error |

For each run, read the steady-state output value from the Scope and calculate:

$$
e_{ss} = 1 - y_{final}
$$

---

### Step 8 — Wiring checklist before each run

✅ Gain block value updated

✅ Feedback wire still connected to Sum (−) input

✅ Scope showing Transfer Fcn output

---

### Prediction Table

Complete before hardware experiments:

<div class="result-block">
<table>
  <thead><tr><th>Kp</th><th>Predicted e<sub>ss</sub> (%)</th><th>Expected behaviour</th></tr></thead>
  <tbody>
    <tr><td>0.5</td><td><input class="result-input" id="lab12-sim-ess05" placeholder="%"></td><td><input class="result-input" id="lab12-sim-beh05" placeholder=""></td></tr>
    <tr><td>1.0</td><td><input class="result-input" id="lab12-sim-ess10" placeholder="%"></td><td><input class="result-input" id="lab12-sim-beh10" placeholder=""></td></tr>
    <tr><td>2.0</td><td><input class="result-input" id="lab12-sim-ess20" placeholder="%"></td><td><input class="result-input" id="lab12-sim-beh20" placeholder=""></td></tr>
    <tr><td>5.0</td><td><input class="result-input" id="lab12-sim-ess50" placeholder="%"></td><td><input class="result-input" id="lab12-sim-beh50" placeholder=""></td></tr>
    <tr><td>10.0</td><td><input class="result-input" id="lab12-sim-ess100" placeholder="%"></td><td><input class="result-input" id="lab12-sim-beh100" placeholder=""></td></tr>
  </tbody>
</table>
</div>

> Theoretical formula: $e_{ss} = \frac{1}{1 + K_P K} \times 100\%$ where K = 1.

---

## Components Required

- ESP32 DevKit V1 (or Arduino Uno as backup)
- Breadboard and jumper wires
- Potentiometer (speed setpoint)
- IRLZ44N MOSFET
- DC Motor
- Flyback diode (1N4001–1N4007)
- 220 Ω gate resistor
- 2 × 10 kΩ resistors (back-EMF voltage divider)
- External battery pack
- OWON HDS272S Oscilloscope (recommended)
- DSO Nano Oscilloscope (compatible)

---

## Experiment 1 - Create a Reference Signal

### Objective

Generate a user-adjustable reference input using the potentiometer.

---

### Circuit Diagram

```text
ESP32 3.3V  (or Arduino 5V as backup)
    │
  Left leg of potentiometer
  Centre leg ──── GPIO34  (ESP32 ADC input)
  Right leg
    │
ESP32 GND
```

---

### Step-by-Step Wiring

1. Insert the potentiometer into the breadboard so all three legs are in separate rows.
2. Connect a jumper wire from **ESP32 3.3V** (or **Arduino 5V** as backup) to the **left outer leg**.
3. Connect a jumper wire from the **centre leg** (wiper) to **ESP32 GPIO34** (or **Arduino A0** as backup).
4. Connect a jumper wire from the **right outer leg** to **ESP32 GND**.

---

### Wiring Checklist

Before uploading:

✅ 3.3V (or 5V as backup) connected to one outer leg

✅ GND connected to the other outer leg

✅ Centre (wiper) leg connected to GPIO34 (or A0 as backup)

---

### ESP32 Code

```cpp
const int REF_PIN = 34;   // potentiometer wiper to ADC pin

void setup()
{
    Serial.begin(115200);
}

void loop()
{
    // analogRead() returns 0–4095 on ESP32 12-bit ADC.
    int reference = analogRead(REF_PIN);

    Serial.println(reference);

    delay(100);
}
```

### Arduino Equivalent Code (backup)

```cpp
void setup()
{
    // Start serial communication to display the reference value.
    Serial.begin(9600);
}

void loop()
{
    // analogRead() returns 0–1023 on Arduino Uno.
    int reference = analogRead(A0);

    Serial.println(reference);

    delay(100);
}
```

---

### Observe

Rotating the potentiometer should change the Serial Monitor value between approximately 0 and full ADC scale.

---

## Experiment 2 - Closed-Loop P Controller with Back-EMF Feedback

### Objective

Close the feedback loop using the motor's back-EMF voltage as a proxy for speed.

When a DC motor spins it generates a voltage proportional to speed — this is called back-EMF. A resistor divider on the motor terminals feeds this voltage into the controller ADC, giving a real feedback signal without a dedicated speed sensor.

> Note: Back-EMF is not a perfect speed measurement — it is affected by winding resistance and load current. It is however sufficient to demonstrate true closed-loop behaviour and observe steady-state error with a P controller.

---

### Circuit Diagram

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

For Arduino backup, use A0 for the reference and A1 for the feedback.

The voltage divider scales the motor terminal voltage to stay within the ADC range.

---

### Wiring Checklist

Before uploading:

✅ Motor circuit wired correctly (MOSFET + flyback diode, same as Project 08)

✅ 10 kΩ divider connected from motor positive terminal to GPIO35 (midpoint) to GND

✅ Potentiometer wiper connected to GPIO34

✅ Shared GND between ESP32, battery, and MOSFET Source

---

### ESP32 Code

```cpp
const int PWM_PIN  = 18;
const int REF_PIN  = 34;   // potentiometer wiper
const int FBK_PIN  = 35;   // back-EMF divider output

float Kp = 0.5;

void setup()
{
    // Configure LEDC channel 0: 500 Hz, 8-bit resolution.
    ledcSetup(0, 500, 8);
    ledcAttachPin(PWM_PIN, 0);
    Serial.begin(115200);
}

void loop()
{
    int reference = analogRead(REF_PIN);   // 0–4095 on ESP32 ADC
    int feedback  = analogRead(FBK_PIN);   // back-EMF proxy

    // Scale 12-bit error to 8-bit PWM domain.
    int error  = reference - feedback;
    int output = (int)(Kp * error / 16.0);
    output     = constrain(output, 0, 255);

    ledcWrite(0, output);

    Serial.print("Ref: ");  Serial.print(reference);
    Serial.print("  Fbk: "); Serial.print(feedback);
    Serial.print("  Err: "); Serial.print(error);
    Serial.print("  PWM: "); Serial.println(output);

    delay(50);
}
```

### Arduino Equivalent Code (backup)

```cpp
float Kp = 0.5;   // proportional gain — adjust during Experiment 3

void setup()
{
    // Configure pin 9 as PWM output for the MOSFET gate.
    pinMode(9, OUTPUT);
    Serial.begin(9600);
}

void loop()
{
    int reference = analogRead(A0);   // desired speed setpoint (0–1023)
    int feedback  = analogRead(A1);   // back-EMF proxy (0–1023)

    // Calculate error: positive error means motor is too slow.
    int error  = reference - feedback;

    // P controller: output proportional to error.
    // Arduino's 10-bit ADC (0-1023) needs different scaling to the
    // 12-bit ESP32 ADC (0-4095), so error is divided by 4 instead of 16.
    int output = (int)(Kp * error / 4.0);

    // Clamp output to valid PWM range.
    output = constrain(output, 0, 255);

    analogWrite(9, output);

    Serial.print("Ref: ");  Serial.print(reference);
    Serial.print("  Fbk: "); Serial.print(feedback);
    Serial.print("  Err: "); Serial.print(error);
    Serial.print("  PWM: "); Serial.println(output);

    delay(50);
}
```

---

### What Is Happening?

The potentiometer sets the reference $r$.

The back-EMF divider measures actual motor speed (proxy) $y$.

The P controller computes:

$$
u = K_P (r - y)
$$

This is a true closed loop — the controller reacts to the difference between desired and actual speed.

---

### Observe

With the loop closed:

1. Set a mid-range reference with the potentiometer. Observe the motor settle.
2. Gently load the motor shaft with your finger. Observe the PWM increase as the controller fights the disturbance.
3. Release. Observe the PWM return toward its previous value.

Record observations:

<div class="result-block">
  <textarea class="result-textarea" id="lab12-exp2-obs" placeholder="Record your observations of closed-loop behaviour and disturbance rejection..."></textarea>
</div>

---

## Experiment 3 - Investigate Controller Gain

### Objective

Observe how Kp changes closed-loop behaviour.

Use the same closed-loop code from Experiment 2. Change only the Kp value at the top of the sketch.

---

### Test A

```cpp
Kp = 0.1;
```

<div class="result-block">
  <textarea class="result-textarea" id="lab12-exp3-obsA" placeholder="Observation for Kp = 0.1..."></textarea>
</div>

---

### Test B

```cpp
Kp = 0.25;
```

<div class="result-block">
  <textarea class="result-textarea" id="lab12-exp3-obsB" placeholder="Observation for Kp = 0.25..."></textarea>
</div>

---

### Test C

```cpp
Kp = 0.5;
```

<div class="result-block">
  <textarea class="result-textarea" id="lab12-exp3-obsC" placeholder="Observation for Kp = 0.5..."></textarea>
</div>

---

### Test D

```cpp
Kp = 1.0;
```

<div class="result-block">
  <textarea class="result-textarea" id="lab12-exp3-obsD" placeholder="Observation for Kp = 1.0..."></textarea>
</div>

---

### Results Table

<div class="result-block">
<table>
  <thead><tr><th>Kp</th><th>Motor behaviour</th><th>PWM saturates?</th></tr></thead>
  <tbody>
    <tr><td>0.1</td><td><input class="result-input" id="lab12-exp3-beh01" placeholder=""></td><td><input class="result-input" id="lab12-exp3-sat01" placeholder="Yes / No"></td></tr>
    <tr><td>0.25</td><td><input class="result-input" id="lab12-exp3-beh025" placeholder=""></td><td><input class="result-input" id="lab12-exp3-sat025" placeholder="Yes / No"></td></tr>
    <tr><td>0.5</td><td><input class="result-input" id="lab12-exp3-beh05" placeholder=""></td><td><input class="result-input" id="lab12-exp3-sat05" placeholder="Yes / No"></td></tr>
    <tr><td>1.0</td><td><input class="result-input" id="lab12-exp3-beh10" placeholder=""></td><td><input class="result-input" id="lab12-exp3-sat10" placeholder="Yes / No"></td></tr>
  </tbody>
</table>
</div>

---

## Oscilloscope Exercise

Observe how the PWM duty cycle changes as you rotate the potentiometer.

```text
Probe Tip  ──────► MOSFET Gate (ESP32 GPIO18 or Arduino Pin 9 as backup)
Probe GND  ──────► ESP32 GND
```

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 2 V/div | 2 V/div |
| Horizontal scale | 500 µs/div | 500 µs/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Observe

Rotate the potentiometer slowly from minimum to maximum.

Observe:

- PWM duty cycle increases
- Motor speed increases
- At high Kp, PWM saturates at 100% before pot reaches maximum

---

## MATLAB Comparison

Simulate the closed-loop response using your actual Kp values from Experiment 3 and the motor model from Project 08 / Project 11.

```matlab
K   = 1;
tau = 0.5;       % your measured tau from Project 08 / Project 11 (s)

G = tf(K, [tau, 1]);

Kp_tested = [0.1, 0.25, 0.5, 1.0];
labels    = {'Kp=0.1','Kp=0.25','Kp=0.5','Kp=1.0'};

t = 0:0.01:5;

figure; hold on;
for i = 1:4
    T = feedback(Kp_tested(i) * G, 1);
    [y, ~] = step(T, t);
    ess = 1 / (1 + Kp_tested(i) * K);
    plot(t, y, 'LineWidth', 2, 'DisplayName', ...
        sprintf('%s  e_{ss}=%.1f%%', labels{i}, ess*100));
end
yline(1.0, 'k--', 'Reference');
grid on;
xlabel('Time (s)'); ylabel('Normalised Output');
title('P Controller - Closed-Loop Response (Motor Plant)');
legend('Location', 'southeast');
```

### Reflection

- Which Kp gave the fastest response without saturation?
- Does the simulated steady-state error match the formula $e_{ss} = 1/(1 + K_P K)$?
- What would happen to the response if τ were larger (heavier motor load)?

---

## Troubleshooting

### Motor Doesn't Respond to Pot

Check:

✅ MOSFET wiring correct

✅ Battery connected

✅ Shared GND between controller and motor supply

✅ Flyback diode installed

---

### PWM Saturates Immediately

Check:

✅ Reduce Kp value

✅ Check potentiometer reading in Serial Monitor

---

### Potentiometer Not Responding

Check:

✅ Centre pin connected to GPIO34 (ESP32) or A0 (Arduino backup)

✅ Controller VCC and GND connected to outer pins

---

### Troubleshooting Checklist

✅ Motor circuit wired correctly (MOSFET + flyback diode)

✅ Back-EMF divider connected to feedback ADC input

✅ Shared GND between controller and battery

✅ Potentiometer reading changes in Serial Monitor

✅ Feedback reading changes with motor speed in Serial Monitor

✅ PWM duty cycle visible on oscilloscope

✅ Motor speed changes with potentiometer

✅ Controller reacts to manual load disturbance

---

## Knowledge Check

### Question 1

What is feedback?

---

### Question 2

What is the error signal?

---

### Question 3

Write the proportional controller equation.

---

### Question 4

What happens when Kp increases?

---

### Question 5

Why can a proportional controller still have steady-state error?

---

### Question 6

Your simulation shows $e_{ss}$ = 16.7% at Kp = 5. What would Kp need to be to reduce $e_{ss}$ below 5%? Show your working using the formula $e_{ss} = 1/(1 + K_P K)$.

---

## Project Summary

In this project you learned:

✅ Open-loop control

✅ Closed-loop control

✅ Back-EMF feedback sensing

✅ Feedback

✅ Error signals

✅ Proportional control

✅ Gain tuning

✅ Steady-state error

✅ Disturbance rejection

✅ Controller behaviour

---

## Next Project

```text
13_PI_Controller.md
```

Topics:

- Integral Action
- Error Accumulation
- Eliminating Steady-State Error
- PI Control
- Controller Tuning
- Improved Closed-Loop Performance
