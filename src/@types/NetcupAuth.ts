export interface NetcupAuth {
  /**
   * Your Netcup API key generated from the [customer control panel](https://www.customercontrolpanel.de/daten_aendern.php?sprung=api).
   */
  apiKey: string;
  /**
   * The associated password for the API key.
   */
  apiPassword: string;
  /**
   * Your customer number.
   */
  customerNumber: string;
  /**
   * The API session ID retrieved by a login.
   */
  apiSessionId: string;
}
