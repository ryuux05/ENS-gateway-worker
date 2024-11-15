// Function to decode DNS-encoded names
export function decodeDnsName(dnsname: Buffer): string {
    const labels = [];
    let idx = 0;
    while (idx < dnsname.length) {
      const len = dnsname[idx];
      if (len === 0) break;
      idx += 1;
      labels.push(dnsname.slice(idx, idx + len).toString('utf8'));
      idx += len;
    }
    return labels.join('.');
  }
  
  // Function to encode DNS names
  export function encodeDnsName(name: string): string {
    const labels = name.split('.');
    let result = '0x';
    for (const label of labels) {
      const len = label.length;
      const hexLen = len.toString(16).padStart(2, '0');
      const hexLabel = Buffer.from(label, 'utf8').toString('hex');
      result += hexLen + hexLabel;
    }
    result += '00'; // Null terminator
    return result;
  }
  