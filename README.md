# SnapAlert for Vue 3

**SnapAlert** is a lightweight and customizable Vue 3 plugin designed for adding stylish alert notifications to your app. This plugin allows you to easily display alerts, confirmations, prompts, and even custom HTML notifications in a user-friendly way.



## Installation

You can install the plugin via npm:

```bash
npm install vue-snap-alert
```

## Usage

Here's how to use SnapAlert in your Vue 3 project:

### Step 1: Import and Use the Plugin

Add SnapAlert to your main Vue entry file (usually `main.js` or `main.ts`).

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import SnapAlert from 'vue-snap-alert';
import 'vue-snap-alert/dist/snapAlert.css'; // Import the CSS

const app = createApp(App);

// Install the SnapAlert plugin
app.use(SnapAlert);

app.mount('#app');
```

### Step 2: Display Alerts

You can now use SnapAlert to display different types of alerts. Here are some examples:

#### Basic Alert

```javascript
this.$SnapAlert.alert('Alert Title', 'This is a basic alert.');
```

#### Success Alert

```javascript
this.$SnapAlert.success('Success', 'Your operation was successful!');
```

#### Error Alert

```javascript
this.$SnapAlert.error('Error', 'Something went wrong.');
```

#### Confirmation Alert with Actions

```javascript
this.$SnapAlert.warning('Are you sure?', 'This action cannot be undone.', {
  enableConfirm: true,
  enableCancel: true,
  onConfirm: () => {
    console.log('Confirmed!');
  },
  onCancel: () => {
    console.log('Cancelled!');
  }
});
```

### Step 3: Customizing Alerts

You can customize the options for each alert. For example:

```javascript
this.$SnapAlert.info('Information', 'This is an info alert.', {
  position: 'top right',
  duration: 5000,
  icon: 'custom-icon-class', // Replace with a Boxicons class name (https://boxicons.com)
  isDark: true
});
```

### Step 4: Set Global Options with `SnapOptions`

You can use the `SnapOptions` method to set global default options for all alerts. This is particularly useful if you want to maintain consistency across multiple alerts.

```javascript
this.$SnapAlert.SnapOptions({
  duration: 5000,
  isDark: true,
  position: 'bottom right'
});
```

#### Example of Using Global Options

After setting global options, all subsequent alerts will use the specified default settings unless overridden by individual alert options:

```javascript
// Set global options
this.$SnapAlert.SnapOptions({
  duration: 4000,
  isDark: false,
});

// Now all alerts will have these default settings
this.$SnapAlert.success('Global Success', 'This alert will use global options.');
this.$SnapAlert.error('Global Error', 'This alert will also use global options.');
```

### Available Options

- **rtl**: `false` (Enable/disable right-to-left support)
- **type**: `'info'`, `'success'`, `'error'`, `'warning'`
- **title**: The title of the alert
- **message**: The message of the alert
- **position**: `'top left'`, `'top right'`, `'bottom left'`, `'bottom right'`, `'top center'`, `'bottom center'`.
- **duration**: Time before auto-close (in milliseconds, default is 3000)
- **autoClose**: Automatically close the alert (default is `true`)
- **enableConfirm**: Show confirm button (default is `false`)
- **onConfirm**: Function to execute when confirmed
- **enableCancel**: Show cancel button (default is `false`)
- **onCancel**: Function to execute when cancelled
- **isDark**: Dark mode for the alert (default is `false`)
- **icon**: Custom icon (default icons are provided)

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Zainalabdeen Radwan**  
[Website](https://picker.sd) | [Email](mailto:zain@picker.sd)
