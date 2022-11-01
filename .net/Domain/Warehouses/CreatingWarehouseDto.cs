namespace DDDSample1.Domain.Warehouses
{
    public class CreatingWarehouseDto
    {
        public string Description { get; set; }


        public CreatingWarehouseDto(string description)
        {
            this.Description = description;
        }
    }
}