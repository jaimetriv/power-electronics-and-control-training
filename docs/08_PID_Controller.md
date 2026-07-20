# Project 8 - PID Control, Damping and Stability

## Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md
- 03_RLC_Circuits.md
- 04_MOSFET_Fundamentals.md
- 05_PWM_Motor_Control.md
- 06_P_Controller.md
- 07_PI_Controller.md

---

# Objective

In this project you will learn:

- What derivative action is
- Why overshoot occurs
- How derivative action improves stability
- How a PID controller works
- How to tune PID gains
- How to observe system behaviour as gains change
- Why PID controllers are widely used in engineering

The PID controller is often considered the most important controller in classical control engineering.

Many industrial systems are controlled using:

```text
PID Controllers
```

because they provide:

- Fast response
- Good stability
- Small overshoot
- Zero steady-state error

---

# Learning Outcomes

At the end of this project you should be able to:

✅ Explain derivative action

✅ Explain overshoot

✅ Explain damping

✅ Implement a PID controller

✅ Tune Kp, Ki and Kd

✅ Understand PID trade-offs

✅ Explain stability improvements

---

# Review of Previous Controllers

## Proportional Controller

$$
u(t)=K_Pe(t)
$$

Provides immediate response.

---

## PI Controller

$$
u(t)=K_Pe(t)+K_I\int e(t)\,dt
$$

Advantages:

- Eliminates steady-state error

Limitation:

- Can produce overshoot
- Can increase oscillation

---

# Why Do We Need Derivative Action?

Consider the following response:

```text
Output

100 |          /\
    |         /  \__
    |        /
    |       /
    |      /
  0 +-----------------
           Time
```

The output exceeds the target.

This is called:

```text
Overshoot
```

---

# Overshoot

Overshoot occurs when the controller reacts too aggressively.

A highly responsive controller may:

- Reach the target quickly
- Continue moving past the target

Result:

```text
Oscillation
```

or

```text
Long settling time
```

---

# Derivative Action

Derivative action predicts future behaviour.

It monitors:

```text
How fast the error is changing
```

rather than simply how large the error is.

---

# Derivative Term

The derivative term is:

$$
\frac{de(t)}{dt}
$$

Where:

- $e(t)$ = Error Signal

This represents:

```text
Rate of Change of Error
```

---

# Intuition

If the error is changing very rapidly:

```text
Derivative Action Increases
```

The controller applies a braking effect.

---

# Vehicle Analogy

Imagine driving toward a red traffic light.

A proportional controller behaves like:

```text
Push accelerator based on distance.
```

A derivative controller behaves like:

```text
Apply brakes when approaching too quickly.
```

The derivative term anticipates future behaviour.

---

# PID Controller Equation

A PID controller combines:

- Proportional Action
- Integral Action
- Derivative Action

The controller equation is:

$$
u(t)=
K_Pe(t)
+
K_I\int e(t)\,dt
+
K_D\frac{de(t)}{dt}
$$

Where:

- $u(t)$ = Controller Output
- $K_P$ = Proportional Gain
- $K_I$ = Integral Gain
- $K_D$ = Derivative Gain
- $e(t)$ = Error Signal

---

# What Each Term Does

## Proportional Action

$$
K_Pe(t)
$$

Provides:

```text
Immediate Correction
```

---

## Integral Action

$$
K_I\int e(t)\,dt
$$

Provides:

```text
Long-Term Correction
```

Eliminates steady-state error.

---

## Derivative Action

$$
K_D\frac{de(t)}{dt}
$$

Provides:

```text
Predictive Damping
```

Reduces overshoot.

---

# Summary Table

| Term | Purpose |
|--------|---------|
| P | React to Error |
| I | Remove Steady-State Error |
| D | Reduce Overshoot and Oscillation |

---

# MATLAB Simulation

Before building the circuit, simulate the closed-loop PID response on the motor plant to predict how derivative action reduces overshoot.

## PID Transfer Function

The PID controller in the s-domain is:

$$
C(s) = K_P + \frac{K_I}{s} + K_D s
$$

## Effect of Kd — Fixed Kp and Ki

```matlab
K   = 1;
tau = 0.5;        % your measured tau from Project 5
Kp  = 0.5;
Ki  = 1.0;

G = tf(K, [tau, 1]);

Kd_values = [0, 0.05, 0.10, 0.20, 0.50];
labels    = {'Kd=0 (PI)','Kd=0.05','Kd=0.10','Kd=0.20','Kd=0.50'};

t = 0:0.01:8;

figure; hold on;
for i = 1:5
    C = tf([Kd_values(i), Kp, Ki], [1, 0]);
    T = feedback(C * G, 1);
    [y, ~] = step(T, t);
    plot(t, y, 'LineWidth', 2, 'DisplayName', labels{i});
end
yline(1.0, 'k--', 'Reference');
grid on;
xlabel('Time (s)'); ylabel('Normalised Output');
title('PID Controller \mdash Effect of K_D (Motor Plant)');
legend('Location', 'northeast');
```

## Simulate Experiment 3 Cases

```matlab
K   = 1;
tau = 0.5;
G   = tf(K, [tau, 1]);

cases = [
    2.0, 0.0, 0.0;   % Case 1: large Kp only
    0.5, 0.5, 0.0;   % Case 2: PI
    0.5, 0.5, 0.2;   % Case 3: PID
];
labels = {'Case 1: Kp=2 (P only)', ...
          'Case 2: Kp=0.5 Ki=0.5 (PI)', ...
          'Case 3: Kp=0.5 Ki=0.5 Kd=0.2 (PID)'};

t = 0:0.01:8;

figure; hold on;
for i = 1:3
    Kp = cases(i,1); Ki = cases(i,2); Kd = cases(i,3);
    C  = tf([Kd, Kp, Ki], [1, 0]);
    T  = feedback(C * G, 1);
    [y, ~] = step(T, t);
    info = stepinfo(T);
    plot(t, y, 'LineWidth', 2, 'DisplayName', ...
        sprintf('%s | OS=%.1f%% Ts=%.2fs', labels{i}, info.Overshoot, info.SettlingTime));
end
yline(1.0, 'k--', 'Reference');
grid on;
xlabel('Time (s)'); ylabel('Normalised Output');
title('PID \mdash Experiment 3 Cases');
legend('Location', 'northeast');
```

## Prediction Table

| Case | Kp | Ki | Kd | Predicted overshoot | Predicted settling time |
|------|----|----|----|--------------------|-----------------------|
| 1 | 2.0 | 0 | 0 | | |
| 2 | 0.5 | 0.5 | 0 | | |
| 3 | 0.5 | 0.5 | 0.2 | | |

---

# Components Required

Same circuit as Projects 6 and 7:

- Arduino Uno
- Breadboard
- Potentiometer (setpoint)
- IRLZ44N MOSFET
- DC Motor
- Flyback diode (1N4001–1N4007)
- 220 Ω resistor (gate resistor)
- Jumper wires
- External battery pack

Equipment:

- DSO Nano Oscilloscope

---

# Experiment 1 - Implement a PID Motor Controller

## Objective

Implement a full PID controller driving the motor via MOSFET.
The potentiometer sets the speed reference.

> Note: Without a speed sensor, this experiment demonstrates open-loop PID control. True closed-loop control is introduced conceptually here and implemented fully when a sensor is available. The motor model identified in Project 14 and the controller design process in Project 15 will show how to tune gains once a feedback path exists.

---

# Circuit

Same as Projects 6 and 7:

```text
Battery +
    |
  Motor
    |--- Flyback diode (cathode to Battery+)
  Drain
  MOSFET (IRLZ44N)
  Source
    |
   GND

Arduino Pin 9 --- 220Ω --- Gate
Potentiometer centre pin --- A0
```

---

# Arduino Code

```cpp
float Kp = 0.5;
float Ki = 1.0;
float Kd = 0.1;

const float dt           = 0.01;    // sample time (s) matches delay(10)
const float integral_max = 200.0;

float integral     = 0;
float previousError = 0;

void setup()
{
    pinMode(9, OUTPUT);
    Serial.begin(9600);
}

void loop()
{
    int reference = analogRead(A0);           // desired speed (0-1023)
    int feedback  = 0;                        // no sensor yet

    float error      = reference - feedback;
    integral         = integral + error * dt;
    integral         = constrain(integral, -integral_max, integral_max);
    float derivative = (error - previousError) / dt;

    float output = Kp * error + Ki * integral + Kd * derivative;
    output = constrain(output, 0, 255);

    analogWrite(9, (int)output);

    Serial.print("Ref: ");  Serial.print(reference);
    Serial.print("  Int: "); Serial.print(integral, 2);
    Serial.print("  Der: "); Serial.print(derivative, 2);
    Serial.print("  PWM: "); Serial.println((int)output);

    previousError = error;
    delay(10);
}
```

---

# Understanding the Code

Proportional Term:

```cpp
Kp * error
```

Reacts immediately.

---

Integral Term:

```cpp
Ki * integral
```

Removes steady-state error.

---

Derivative Term:

```cpp
Kd * derivative
```

Provides damping.

---

# Experiment 2 - Effect of Derivative Gain

## Objective

Observe how changing Kd affects behaviour.

---

## Test A

```cpp
Kd = 0;
```

This becomes:

```text
PI Control
```

Observation:

```text
______________________
```

---

## Test B

```cpp
Kd = 0.02;
```

Observation:

```text
______________________
```

---

## Test C

```cpp
Kd = 0.10;
```

Observation:

```text
______________________
```

---

## Test D

```cpp
Kd = 0.50;
```

Observation:

```text
______________________
```

---

# Results Table

| Kd | Behaviour |
|----|-----------|
| 0 | |
| 0.02 | |
| 0.10 | |
| 0.50 | |

---

# Understanding Damping

In Project 3 we studied:

```text
RLC Circuits
```

and:

```text
Damping Ratio
```

Derivative action behaves similarly.

Increasing:

$$
K_D
$$

typically increases damping.

This often reduces:

- Overshoot
- Oscillation

and improves:

- Stability

---

# Experiment 3 - Controller Tuning

## Objective

Investigate the effects of all three gains.

---

# Case 1

Large Kp

```cpp
Kp = 2.0;
Ki = 0.0;
Kd = 0.0;
```

Expected:

```text
Very Responsive
```

Possible:

```text
Overshoot
```

---

# Case 2

Large Ki

```cpp
Kp = 0.5;
Ki = 0.5;
Kd = 0.0;
```

Expected:

```text
Eliminates Error
```

Possible:

```text
Oscillation
```

---

# Case 3

Add Derivative

```cpp
Kp = 0.5;
Ki = 0.5;
Kd = 0.2;
```

Expected:

```text
Improved Stability
```

---

# Tuning Guidelines

## If Response Is Too Slow

Increase:

$$
K_P
$$

---

## If Steady-State Error Exists

Increase:

$$
K_I
$$

---

## If Overshoot Is Excessive

Increase:

$$
K_D
$$

---

# DSO Nano Exercise

Observe the PWM output.

---

# Probe Connections

Probe Tip:

```text
Pin 9
```

Probe Ground:

```text
GND
```

---

# DSO Nano Settings

Vertical:

```text
2 V/div
```

Horizontal:

```text
500 us/div
```

Trigger:

```text
Rising Edge
```

---

# Observation

Adjust gains and observe changes in PWM duty cycle.

Record:

```text
__________________________________
```

---

# Controller Performance Metrics

When evaluating a controller we often examine:

---

## Rise Time

Time required to reach the target.

---

## Overshoot

Amount by which the output exceeds the target.

---

## Settling Time

Time required for oscillations to disappear.

---

## Steady-State Error

Remaining error after the system settles.

---

# Desired Response

A well-tuned PID controller typically produces:

```text
Output

100 |        ________
    |      /
    |     /
    |    /
    |   /
  0 +----------------
          Time
```

Characteristics:

- Fast response
- Minimal overshoot
- Small settling time
- Zero steady-state error

---

# MATLAB Comparison

Now simulate the closed-loop PID response using your actual gains from Experiments 2 and 3, and compare P, PI and PID directly.

## Enter Your Parameters

```matlab
K   = 1;
tau = 0.5;       % your measured tau from Project 5
Kp  = 0.5;       % your tuned value
Ki  = 1.0;       % your tuned value
Kd  = 0.1;       % your tuned value

G    = tf(K, [tau, 1]);
C_P  = tf(Kp, 1);
C_PI = tf([Kp, Ki], [1, 0]);
C_PID = tf([Kd, Kp, Ki], [1, 0]);

T_P   = feedback(C_P   * G, 1);
T_PI  = feedback(C_PI  * G, 1);
T_PID = feedback(C_PID * G, 1);

t = 0:0.01:8;
[y_P,   ~] = step(T_P,   t);
[y_PI,  ~] = step(T_PI,  t);
[y_PID, ~] = step(T_PID, t);

figure; hold on;
plot(t, y_P,   'b:',  'LineWidth', 2, 'DisplayName', 'P');
plot(t, y_PI,  'r--', 'LineWidth', 2, 'DisplayName', 'PI');
plot(t, y_PID, 'g',   'LineWidth', 2, 'DisplayName', 'PID');
yline(1.0, 'k--', 'Reference');
grid on;
xlabel('Time (s)'); ylabel('Normalised Output');
title('P vs PI vs PID \mdash Motor Plant');
legend('Location', 'northeast');

% Print performance metrics
controllers = {T_P, T_PI, T_PID};
names       = {'P', 'PI', 'PID'};
fprintf('%-6s %-12s %-12s %-12s\n', 'Type', 'RiseTime(s)', 'Overshoot(%)', 'SettlingTime(s)');
for i = 1:3
    info = stepinfo(controllers{i});
    fprintf('%-6s %-12.3f %-12.1f %-12.3f\n', ...
        names{i}, info.RiseTime, info.Overshoot, info.SettlingTime);
end
```

## Reflection

- Does adding Kd reduce overshoot compared to PI alone?
- Is there a Kd value beyond which the response gets worse? Why?
- How do the printed metrics compare to what you observed on the motor?

---

# Typical Controller Applications

PID controllers are widely used in:

## Motor Control

Speed and position control.

---

## Robotics

Motion systems.

---

## Process Control

Temperature, pressure and flow regulation.

---

## Power Electronics

Converter regulation.

---

## Industrial Automation

Closed-loop control systems.

---

# Knowledge Check

## Question 1

What does derivative action measure?

Answer:

```text
____________________
```

---

## Question 2

Write the PID controller equation.

Answer:

```text
____________________
```

---

## Question 3

What does the integral term do?

Answer:

```text
____________________
```

---

## Question 4

What does the derivative term do?

Answer:

```text
____________________
```

---

## Question 5

Which gain is primarily used to reduce overshoot?

Answer:

```text
____________________
```

---

## Question 6

Your MATLAB comparison shows PID settling time is shorter than PI but overshoot is also lower. Explain in terms of the derivative term why this is possible — how can the controller be both faster and less oscillatory?

Answer:

```text
____________________
```

---

# Common Mistakes

## Excessive Oscillation

Reduce:

- Kp
- Ki

or increase:

- Kd

---

## Very Slow Response

Increase Kp carefully.

---

## Motor Doesn't Respond

Check:

- MOSFET wiring
- Battery connected
- Shared ground
- Flyback diode installed

---

## Controller Saturation

Check:

- Output constrain() limits
- Anti-windup limit
- Kp/Ki values

---

## Derivative Spike on Setpoint Change

This is normal — the derivative term reacts to the sudden change in error.
Reduce Kd or apply derivative on measurement only (advanced topic).

---

# Troubleshooting Checklist

✅ Motor circuit wired correctly (same as Projects 6 and 7)

✅ Shared ground between Arduino and battery

✅ Serial Monitor shows reference, integral, derivative and PWM

✅ PWM duty cycle visible on DSO Nano

✅ Anti-windup limit in code

✅ dt constant matches delay() value

✅ Motor speed changes with potentiometer

---

# Project Summary

In this project you learned:

✅ PID control

✅ Derivative action

✅ Damping

✅ Overshoot reduction

✅ Controller tuning

✅ Stability concepts

✅ Closed-loop performance metrics

✅ Practical PID implementation

You now understand the most widely used controller in classical control engineering.

---

# Next Project

**09_Buck_Converter.md**

Topics:

- DC-DC Conversion
- Inductors in Power Electronics
- MOSFET Switching
- Energy Transfer
- Output Ripple
- Converter Efficiency
- Practical Power Electronics
