namespace AirlinesApp.DataPresentation
{
     public class AddTicketModel
     {
          public int FlightId { get; set; }
          public string Category { get; set; }
          public int CompanyId { get; set; }
          public decimal Price { get; set; }
          public int Count { get; set; }
     }
}
