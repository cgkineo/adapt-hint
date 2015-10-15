# adapt-hint

**Hint** is a C&G Kineo *presentation extension*.

The extension adds a small, clickable icon to a component that displays additional information.

##Installation

Open the */src/extensions* folder in a new terminal window on Mac OSX or right click the folder and select 'Git Bash Here' on Windows.

Git clone the component, making sure to delete the hidden **.git** folder from the *adapt-hint* folder.

## Settings Overview

The attributes listed below are used in *components.json* to configure **Hint**, and are properly formatted as JSON in [*example.json*](https://github.com/cgkineo/adapt-hint/blob/master/example.json).

## Attributes

**_hint-extension** (object): The hint-extension object that contains a value for **_items**.

>**_items** (array): Multiple items may be created. Each *_item* represents one element of the hint extension and contains values for **title**, and **body**.

>>**title** (string): The title of the particular item.

>>**body** (string): The body text content of the particular item.

## Accessibility
**Hint** is not currently accessible.

## Limitations

----------------------------
**Version number:**  2.0  
**Framework versions:** 2.0  
**Author / maintainer:** C&G Kineo  
**Accessibility support:** No  
**RTL support:** Yes  
**Cross-platform coverage:** To be confirmed  
