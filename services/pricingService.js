// Example price calculation function
exports.calculatePrice = (pickupCoordinates, dropoffCoordinates, size, type) => {
    const distance = Math.sqrt(
      Math.pow(dropoffCoordinates.lat - pickupCoordinates.lat, 2) +
      Math.pow(dropoffCoordinates.lng - pickupCoordinates.lng, 2)
    );
  
    const basePrice = 10; // Base price
    const distanceFactor = 1.5; // Price per unit distance
    const sizeFactor = size === 'large' ? 2 : 1; // Size factor
    const typeFactor = type === 'fragile' ? 1.5 : 1; // Type factor
  
    const price = basePrice + (distance * distanceFactor * sizeFactor * typeFactor);
    return price.toFixed(2); // Return as a string with two decimal places
  };
  