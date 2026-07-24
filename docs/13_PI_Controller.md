# Project 13 - PI Control and Eliminating Steady-State Error

### Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md
- 03_RLC_Circuits.md
- 04_MOSFET_Fundamentals.md
- 10_PWM_Motor_Control.md
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

## MATLAB Simulation

Before building the circuit, simulate the closed-loop PI response on the first-order motor model to predict how integral action eliminates steady-state error.

### Effect of Ki — Fixed Kp

```matlab
K   = 1;
tau = 0.5;        % your measured tau from Project 10
Kp  = 0.5;

G = tf(K, [tau, 1]);

Ki_values = [0, 0.5, 1.0, 2.0, 5.0];
labels    = {'Ki=0 (P only)','Ki=0.5','Ki=1.0','Ki=2.0','Ki=5.0'};

t = 0:0.01:8;

figure; hold on;
for i = 1:5
    C = tf([Kp, Ki_values(i)], [1, 0]);
    T = feedback(C * G, 1);
    [y, ~] = step(T, t);
    plot(t, y, 'LineWidth', 2, 'DisplayName', labels{i});
end
yline(1.0, 'k--', 'Reference');
grid on;
xlabel('Time (s)'); ylabel('Normalised Output');
title('PI Controller - Effect of K_I (Motor Plant)');
legend('Location', 'southeast');
```

### Prediction Table

| Kp | Ki | Predicted e\_{ss} | Expected overshoot? |
|----|----|------------------|---------------------|
| 0.5 | 0 | | |
| 0.5 | 0.5 | | |
| 0.5 | 1.0 | | |
| 0.5 | 2.0 | | |
| 0.5 | 5.0 | | |

---

## Components Required

Same circuit as Project 12:

- Arduino Uno or ESP32 DevKit V1
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
    ├──── 10 kΩ ──── A1  (back-EMF feedback)
                │
              10 kΩ
                │
               GND

  Drain (MOSFET IRLZ44N)
  Source
    │
   GND

PWM Output (Arduino Pin 9 or ESP32 GPIO18) ──── 220 Ω ──── Gate
Potentiometer centre pin ──── A0
```

---

### Wiring Checklist

Before uploading:

✅ Motor circuit wired correctly (same as Project 12)

✅ Back-EMF divider connected to A1 (Arduino) or FBK_PIN (ESP32)

✅ Potentiometer wiper connected to A0 (Arduino) or REF_PIN (ESP32)

✅ Shared GND between controller and battery

---

### Arduino Code

```cpp
float Kp = 0.5;
float Ki = 1.0;

const float dt      = 0.05;    // sample time (s) — matches delay(50)
const float int_max = 500.0;   // anti-windup limit

float integral = 0;

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

    // Calculate error.
    float error = reference - feedback;

    // Accumulate error over time (integral term).
    integral = integral + error * dt;

    // Anti-windup: clamp integral to prevent excessive accumulation.
    integral = constrain(integral, -int_max, int_max);

    // PI controller output.
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

### ESP32 Equivalent Code

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
    int reference = analogRead(REF_PIN);   // 0–4095 on ESP32 ADC
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

## Experiment 2 - Effect of Integral Gain

### Objective

Observe the effect of changing $K_I$.

Use the same closed-loop code from Experiment 1. Change only the Ki value.

---

### Test A

```cpp
Ki = 0;   // Pure P Controller
```

Observation:

```text
_______________________
```

---

### Test B

```cpp
Ki = 0.01;
```

Observation:

```text
_______________________
```

---

### Test C

```cpp
Ki = 0.05;
```

Observation:

```text
_______________________
```

---

### Test D

```cpp
Ki = 0.1;
```

Observation:

```text
_______________________
```

---

### Results Table

| Ki | Behaviour |
|----|-----------|
| 0 | |
| 0.01 | |
| 0.05 | |
| 0.10 | |

---

## Experiment 3 - Effect of Proportional Gain

Keep:

```cpp
Ki = 0.02;
```

Change Kp through the following values and record the behaviour.

| Kp | Behaviour |
|----|-----------|
| 0.1 | |
| 0.5 | |
| 1.0 | |

---

## Oscilloscope Exercise

Observe the controller PWM output.

```text
Probe Tip  ──────► MOSFET Gate (Arduino Pin 9 or ESP32 GPIO18)
Probe GND  ──────► Arduino GND
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

Record observations:

```text
__________________________________
```

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
tau = 0.5;       % your measured tau from Project 10
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
