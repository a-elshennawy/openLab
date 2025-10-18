# OpenLab

A simple web application for generating professional laboratory test reports in PDF format. Fill in patient information and test results, then download a formatted PDF report instantly.

## Features

- **Multiple Test Types**: Support for various laboratory tests (Thyroid, Liver, Kidney, CBC, etc.)
- **Gender-Specific Normal Ranges**: Automatically displays appropriate reference ranges based on patient gender
- **PDF Generation**: Convert form data to professionally formatted PDF reports
- **Instant Download**: Download reports with patient name and test type in filename
- **Responsive Design**: Clean, mobile-friendly interface
- **Easy Data Entry**: Simple form-based interface for quick data input

## Tech Stack

- **Frontend**: React 19 with Vite
- **Styling**: Bootstrap 5 + Custom CSS
- **PDF Generation**: jsPDF + html2canvas
- **Icons**: React Icons
- **Build Tool**: Vite with SWC

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd openlab
```

2. Install dependencies:
```bash
npm install
```

3. Ensure you have the required static assets:
   - `/public/labTests.json` - Laboratory tests data
   - `/public/logo.png` - Lab logo
   - `/fonts/Ubuntu-Regular.ttf` - Ubuntu font
   - `/fonts/Zain-Bold.ttf` - Zain font

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── App.jsx           # Main application component
├── App.css           # Global styles
├── fonts.css         # Custom font definitions
└── main.jsx          # Application entry point

public/
├── labTests.json     # Test definitions and normal ranges
├── logo.png          # Lab logo for reports
└── fonts/            # Custom font files
```

## Lab Tests Data Structure

The `labTests.json` file should follow this structure:

```json
[
  {
    "id": "thyroid",
    "name": "Thyroid Function Tests",
    "category": "Endocrinology",
    "testFields": [
      {
        "name": "tsh",
        "label": "TSH",
        "unit": "mIU/L",
        "normalRange": {
          "all": "0.4-4.0"
        }
      },
      {
        "name": "t3",
        "label": "T3",
        "unit": "ng/dL",
        "normalRange": {
          "male": "80-200",
          "female": "70-180"
        }
      }
    ]
  }
]
```

### Field Definitions

- `id`: Unique identifier for the test
- `name`: Display name of the test
- `category`: Medical category/specialty
- `testFields`: Array of test parameters
  - `name`: Field identifier
  - `label`: Display label
  - `unit`: Measurement unit (optional)
  - `normalRange`: Reference ranges
    - `all`: Universal range (for both genders)
    - `male`: Male-specific range
    - `female`: Female-specific range

## How It Works

### PDF Generation Process

1. **HTML to Canvas**: Uses `html2canvas` to capture the form as an image
2. **Canvas to Image**: Converts the canvas to PNG format (base64)
3. **Image to PDF**: Uses `jsPDF` to create a PDF document
4. **Smart Scaling**: Automatically scales the form to fit A4 page size
5. **Auto Download**: Generates filename as `{PatientName}_{TestName}.pdf`

### Key Features Explained

#### Gender-Specific Ranges
The app automatically displays appropriate normal ranges based on the selected gender:
```javascript
const normalRange = field.normalRange[gender] || field.normalRange.all;
```

#### Dynamic Form Generation
Test fields are dynamically generated based on the selected test from `labTests.json`, making it easy to add new tests without code changes.

#### Responsive PDF Layout
The PDF generation calculates optimal dimensions to fit the form on an A4 page:
```javascript
const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
```

## Usage

1. **Select a Test**: Choose from the dropdown menu
2. **Enter Patient Information**: Fill in name, age, and gender
3. **Enter Test Results**: Input values for each test parameter
4. **View Normal Ranges**: Reference ranges are displayed below each field
5. **Download PDF**: Click "Download PDF Report" to generate and download

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Adding New Tests

To add new laboratory tests:

1. Edit `/public/labTests.json`
2. Add a new test object with the required structure
3. Define test fields with appropriate normal ranges
4. The form will automatically generate the fields

Example:
```json
{
  "id": "lipid-panel",
  "name": "Lipid Panel",
  "category": "Cardiology",
  "testFields": [
    {
      "name": "cholesterol",
      "label": "Total Cholesterol",
      "unit": "mg/dL",
      "normalRange": {
        "all": "<200"
      }
    }
  ]
}
```

## Customization

### Styling
- Modify `src/App.css` for custom styles
- Bootstrap classes are available for layout
- PDF appearance reflects the form styling

### Logo
Replace `/public/logo.png` with your lab's logo

### Fonts
- Add custom fonts to `/fonts/` directory
- Update `src/fonts.css` with font-face declarations

## Browser Support

Modern browsers with ES6+ support:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Known Limitations

- PDF generation requires the form to be visible in the viewport
- Very long forms may require pagination (not currently implemented)
- Print quality depends on screen resolution

## Future Enhancements

- [ ] Multi-page PDF support for long forms
- [ ] Save/load draft reports
- [ ] Print preview before download
- [ ] Report templates customization
- [ ] Date picker for test date
- [ ] Doctor signature field
- [ ] Export to other formats (CSV, JSON)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## Acknowledgments

- jsPDF for PDF generation
- html2canvas for HTML to image conversion
- Bootstrap for responsive layout
- React team for the framework
