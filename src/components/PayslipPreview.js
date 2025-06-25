  const convertToWords = (amount) => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const scales = ['', 'Thousand', 'Lakh', 'Crore'];

    if (amount === 0) return 'Zero';

    const getWords = (num) => {
      let words = '';

      if (num > 99) {
        words += ones[Math.floor(num / 100)] + ' Hundred ';
        num = num % 100;
      }

      if (num > 19) {
        words += tens[Math.floor(num / 10)] + ' ';
        num = num % 10;
      } else if (num >= 10) {
        words += teens[num - 10] + ' ';
        num = 0;
      }

      if (num > 0) {
        words += ones[num] + ' ';
      }

      return words.trim();
    };

    let result = '';
    let scaleIndex = 0;

    while (amount > 0) {
      const chunk = amount % 1000;
      if (chunk > 0) {
        result = getWords(chunk) + ' ' + scales[scaleIndex] + ' ' + result;
      }
      amount = Math.floor(amount / 1000);
      scaleIndex++;
    }

    return result.trim() + ' Rupees Only';
  };
