# Problem Statement:
- Create a small Crypto application with live update price.
Upon clicking one of the coins, it'll show the candlestick and order book page using hardcoded data.


# How test: 
- Ensure that you have Node js version > 18.0.0 installed.
- Download Expo Go in your phone / simulator. 
- Go to project directory, type "npm install" to install dependencies.
- In your terminal, a barcode will be shown, scan it using your Android's Expo go, or if you are using iOS, you can use your camera app.


# Tech used:
- React Native
- Expo Go
- React Wagmi for candlestick chart and its related dependencies


# Things to consider:
- Some of the data is dummy, but the price update is real, using socket connection. 
- Initial price data is fetched using normal http request, followed by socket connection for real price update.
- The application is tested against simulator on iOS and real device on Android. 


# Future improvement:
- Add more features and screens.
- Better coverage at tests.
- Replace dummy data with real data, preferrably from socket connection.
- Overall UI/UX.


<img width="495" alt="Screenshot 2024-02-04 at 5 11 44 PM" src="https://github.com/christopher-bobby/AwesomeProject/assets/13780904/a9756cbb-1a5b-4be3-a81c-d16f880deda2">
<img width="508" alt="Screenshot 2024-02-04 at 11 09 33 PM" src="https://github.com/christopher-bobby/AwesomeProject/assets/13780904/36b0b540-bb56-4a99-8482-35b5de4849d9">
