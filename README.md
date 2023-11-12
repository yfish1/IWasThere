# IWasThere

The iWasThere app is a React Native application that combines signature registration with location tracking. It comprises two main components:

   * **User Interface**: Enables users to input their signatures based on a provided list.
   * **Admin Interface**: Offers an overview of registered signatures, including name, student ID, date, location (reverse address lookup), search/filter capabilities, and access protected by a password.

## Project Goals

   * **Local Data Handling**: All data is stored locally in an **SQLite database**.
   * **Data Management**: Provides the functionality to add, delete, and manually input students or import a CSV list.
   * **Signature Storage**: Signatures are saved as base64 encoded data for easy storage and retrieval.

## Additional resources

   * **Signature Verification**: Implements verification measures such as line curvature count, width/height ratio, line length, and additional surprise authentication elements.
> https://github.com/szimek/signature_pad

The iWasThere app aims to provide a seamless solution for signature registration and location-based data tracking, incorporating security measures and diverse functionalities for both user and administrative purposes.
