# User Guide 📚

An instruction on how to use the extension and on how to understand its communication.

## How to
The extension has a form of a popup which accepts a user's input.

![image](https://user-images.githubusercontent.com/3950530/138863948-eb82b6b2-598d-4f81-9c52-23555494fc48.png)

The extension looks for a fist parent element (with a non-static position) to the element specified with the **element's selector**.

### 📌 Element's selector input + Find button

The input accepts any CSS selector. It can be retrieved via the Chrome Dev tools:

![image](https://user-images.githubusercontent.com/3950530/138868033-e11f7cb3-2242-446d-ab16-64a36fa932c2.png)

After copying the selector, simply paste it in the input and click **Find**.</br>
There can be many different results depending on the provided selector, as following.

#### 1️⃣ No element associated with the selector

If there is no element associated with the provided selector, the extension will alert saying it could not find an element.</br>
The message will also include the selector used (_test_ in the example below).

![image](https://user-images.githubusercontent.com/3950530/138868931-9d72c90d-8f96-4819-b6c6-14d21c6d51c2.png)

#### 2️⃣ No selector provided

If no selector was provided, the corresponding alert will be raised as well.

![image](https://user-images.githubusercontent.com/3950530/138869875-2531f1a7-9237-4270-9e45-960fb73d8087.png)

#### 3️⃣ No parent found

If no parent element is found, then the alert with the information that the **HTML** element is the parent is displayed.

![image](https://user-images.githubusercontent.com/3950530/138867716-786f441e-e5ea-41a5-93f5-7840a2e5c79d.png)

#### 4️⃣ A direct parent found

If there is a direct parent found, then this parent element is being highlighted with a flashy colour in addition to giving it a CSS class to make it easier to identify in case if the colours cannot be read for any reason.

![image](https://user-images.githubusercontent.com/3950530/138871996-57a809a6-95ba-4d40-ad5b-bd8420456d43.png)

![image](https://user-images.githubusercontent.com/3950530/138872297-8b816eb1-f23a-4246-86a3-298e9abd172b.png)

### 📌 Clear button

Clicking the **Clear** button removes the extension CSS class from the direct parent element, hence it has effect only if such a parent element was found - otherwise, it has no effect.
