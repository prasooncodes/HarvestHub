import pandas as pd
import numpy as np

def wrangle_and_format_crop_data(input_file='C:\\Users\\Prafful Joshi\\OneDrive\\Desktop\\HarvestHub\\ML\\dataset\\Crop_recommendation.csv', output_file='C:\\Users\\Prafful Joshi\\OneDrive\\Desktop\\HarvestHub\\ML\\dataset\\crop_recommendation_new.csv'):

    try:
        # Read the CSV file
        print(f"Reading data from {input_file}...")
        df = pd.read_csv(input_file)
        
        # Display basic info about the dataset
        print(f"Original dataset shape: {df.shape}")
        print(f"Columns in original dataset: {list(df.columns)}")
        
        # Create a new dataframe with only the required columns
        required_columns = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall', 'label']
        
        # Check if all required columns exist
        missing_columns = [col for col in required_columns if col not in df.columns]
        if missing_columns:
            print(f"Warning: Missing columns: {missing_columns}")
            # Try alternative column names that might exist
            column_mapping = {
                'temperature': ['temp', 'Temperature', 'TEMPERATURE'],
                'humidity': ['Humidity', 'HUMIDITY'],
                'ph': ['pH', 'PH', 'Ph'],
                'rainfall': ['Rainfall', 'RAINFALL', 'rain'],
                'label': ['Label', 'LABEL', 'crop', 'Crop']
            }
            
            # Map alternative column names
            for standard_name, alternatives in column_mapping.items():
                if standard_name not in df.columns:
                    for alt in alternatives:
                        if alt in df.columns:
                            df = df.rename(columns={alt: standard_name})
                            print(f"Mapped column '{alt}' to '{standard_name}'")
                            break
        
        # Select only the required columns
        available_columns = [col for col in required_columns if col in df.columns]
        wrangled_df = df[available_columns].copy()
        
        # Data wrangling operations
        print("Wrangling data...")
        
        # Remove any rows with missing values
        initial_rows = len(wrangled_df)
        wrangled_df = wrangled_df.dropna()
        print(f"Removed {initial_rows - len(wrangled_df)} rows with missing values")
        
        # Clean numeric columns
        numeric_columns = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
        for col in numeric_columns:
            if col in wrangled_df.columns:
                # Convert to numeric, replacing any non-numeric values with NaN
                wrangled_df[col] = pd.to_numeric(wrangled_df[col], errors='coerce')
        
        # Remove rows where numeric conversion failed
        initial_rows = len(wrangled_df)
        wrangled_df = wrangled_df.dropna()
        if initial_rows != len(wrangled_df):
            print(f"Removed {initial_rows - len(wrangled_df)} rows with invalid numeric values")
        
        # Clean the label column (remove extra spaces, convert to lowercase)
        if 'label' in wrangled_df.columns:
            wrangled_df['label'] = wrangled_df['label'].astype(str).str.strip().str.lower()
        
        # Round numeric values to reasonable precision
        for col in numeric_columns:
            if col in wrangled_df.columns:
                if col in ['N', 'P', 'K']:
                    # Keep N, P, K as integers
                    wrangled_df[col] = wrangled_df[col].round().astype(int)
                else:
                    # Round other numeric columns to 8 decimal places
                    wrangled_df[col] = wrangled_df[col].round(8)
        
        # Sort the dataframe for consistency
        wrangled_df = wrangled_df.sort_values(['label', 'N', 'P', 'K']).reset_index(drop=True)
        
        # Display wrangling results
        print(f"Final dataset shape: {wrangled_df.shape}")
        print(f"Final columns: {list(wrangled_df.columns)}")
        print(f"Unique labels: {wrangled_df['label'].unique() if 'label' in wrangled_df.columns else 'N/A'}")
        
        # Display sample of wrangled data
        print("\nSample of wrangled data:")
        print(wrangled_df.head())
        
        # Save the wrangled data
        print(f"\nSaving wrangled data to {output_file}...")
        wrangled_df.to_csv(output_file, index=False)
        print(f"Successfully saved wrangled data to {output_file}")
        print(f"File contains {len(wrangled_df)} rows and {len(wrangled_df.columns)} columns")
        
        # Display summary statistics
        print("\nSummary statistics:")
        print(wrangled_df.describe())
        
        return wrangled_df
        
    except FileNotFoundError:
        print(f"Error: File '{input_file}' not found. Please make sure the file exists in the current directory.")
        return None
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return None

def validate_wrangled_data(file_path='crop_recommendation_new.csv'):
    """
    Validate the wrangled data file.
    """
    try:
        df = pd.read_csv(file_path)
        print(f"\nValidation of {file_path}:")
        print(f"Shape: {df.shape}")
        print(f"Columns: {list(df.columns)}")
        
        # Check for missing values
        missing_values = df.isnull().sum()
        if missing_values.sum() > 0:
            print(f"Missing values found:\n{missing_values[missing_values > 0]}")
        else:
            print("No missing values found.")
        
        # Check data types
        print(f"\nData types:\n{df.dtypes}")
        
        return True
    except Exception as e:
        print(f"Validation error: {str(e)}")
        return False

if __name__ == "__main__":
    print("=" * 50)
    print("CROP RECOMMENDATION DATA WRANGLER")
    print("=" * 50)
    
    # Wrangle and format the data
    wrangled_data = wrangle_and_format_crop_data()
    
    if wrangled_data is not None:
        # Validate the wrangled data
        validate_wrangled_data()
        print("\n" + "=" * 50)
        print("SUCCESS: Data wrangling completed!")
        print("Output file 'crop_recommendation_new.csv' has been created")
        print("=" * 50)
    else:
        print("\n" + "=" * 50)
        print("FAILED: Data wrangling failed. Please check the error messages above.")
        print("=" * 50)