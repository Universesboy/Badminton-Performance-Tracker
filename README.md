# Colin Badminton Performance Tracking Tool

A comprehensive web application for badminton coaches and athletes to track training progress, assessment results, and competition performance. This tool helps coaches monitor athlete development, store assessment data, and analyze performance trends over time to optimize training programs and competition strategies.

<!-- Add a screenshot of your application here:
![Badminton Tool Screenshot](public/screenshot.png)
-->

## Features

- **Dashboard**: Get an overview of athlete performance metrics and upcoming assessments
- **Athlete Management**: Add, view, and manage athlete profiles with detailed statistics
- **Assessment Tracking**: Record and analyze technical and physical assessments
- **Performance Analytics**: Visualize progress over time with interactive charts
- **Competition Management**: Track competition results and athlete participation
- **Customizable Settings**: Configure application preferences and assessment criteria

## Technology Stack

- **Frontend**: React, TypeScript, Material UI
- **State Management**: React Context API
- **Routing**: React Router
- **Data Visualization**: Chart.js with React-ChartJS-2
- **Build Tools**: Create React App

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/colin-badminton-tool.git
   cd colin-badminton-tool
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Getting Started

To start using the application:

1. **Initial Setup**: Configure your settings in the Settings page
2. **Add Athletes**: Create profiles for all your badminton athletes
3. **Create Assessment Templates**: Define the criteria you want to track
4. **Record Assessments**: Begin tracking performance data
5. **Analyze Results**: Use the dashboard and performance views to gain insights

## Project Structure

```
colin_badminton_tool/
├── public/                 # Static files
├── src/                    # Source code
│   ├── components/         # Reusable UI components
│   │   ├── athlete/        # Athlete-related components
│   │   ├── assessment/     # Assessment-related components
│   │   └── common/         # Shared components (Layout, etc)
│   ├── contexts/           # React Context providers
│   ├── pages/              # Page components
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main application component
│   └── index.tsx           # Application entry point
└── package.json            # Project dependencies
```

## Usage

### Adding a New Athlete

1. Navigate to the Athletes section
2. Click the "Add Athlete" button
3. Fill in the athlete details and save

### Recording an Assessment

1. Navigate to the Assessments section
2. Click "New Assessment"
3. Select an athlete and assessment type
4. Enter the assessment data and save

### Viewing Performance Analytics

1. Navigate to the Performance section
2. Select an athlete from the dropdown
3. Choose metrics and date range to visualize

## Development

### Prerequisites

- Node.js v16+
- npm v8+

### Available Scripts

- `npm start` - Run the app in development mode
- `npm test` - Run the test suite
- `npm run build` - Build the app for production
- `npm run eject` - Eject from Create React App

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Acknowledgments

- Created by Colin
- Inspired by the need for better performance tracking in badminton training
