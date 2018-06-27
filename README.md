# PWA-Basic

This code is just an example of the logic or a Progrssive Web Application (PWA).

The code was quick and dirty but, it is effective. I just threw it together as proof of concept.

A PWA should be able to work independently from a server should there be no online connection (off-line mode) once the application is installed.

In this case I am using the local storage. The ajax code is designed to handle a failed connection to the server quietly returning false.

If false then the code reverts to the local storage. ( See the attached PDF to understand the logic ).

The application is allowed to be installed on a mobile device because of the manifest.json file.

This properly formatted file tells the device about the program. This allows the device to take advantage of an applcation known as a service worker. 


