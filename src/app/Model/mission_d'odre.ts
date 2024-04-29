// MissionOrdersIn représente la structure d'entrée pour la mise à jour des attributs de MissionOrders.
interface MissionOrdersIn {
    object: string; // Object of the missionOrders
    description: string; // Description of the missionOrders
    adressClient?: string; // Adress client for the Mission
    endDate: string; // EndDate of the missionOrders
    startDate: string; // StartDate of the missionOrders
    transport: string; // Transport of the missionOrders
}

// MissionOrdersCount représente le nombre de MissionOrders.
interface MissionOrdersCount {
    count: number; // Count is the number of MissionOrders.
}

// MissionOrdersDetails représente des informations détaillées sur un MissionOrders spécifique.
interface MissionOrdersDetails {
    id: string; // ID is the unique identifier for the MissionOrders.
    object: string; // Object of the missionOrders
    description: string; // Description of the missionOrders
    transport: string; // Transport of the missionOrders
    endDate: string; // EndDate of the missionOrders
    startDate: string; // StartDate of the missionOrders
    userID: string; // ID is the unique identifier for the Missi
}

// MissionsPagination représente la liste paginée des missions.
interface MissionsPagination {
    items: MissionsTable[]; // Items is a slice containing individual missions details.
    page: number; // Page is the current page number in the pagination.
    limit: number; // Limit is the maximum number of items per page in the pagination.
    totalCount: number; // TotalCount is the total number of missions orders in the entire list.
}

// MissionsTable représente une entrée de mission dans un tableau.
interface MissionsTable {
    id: string; // ID is the unique identifier for the missions.
    object: string; // Object of the missions.
    description: string; // Description of the missions.
    transport: string; // Transport of the missions.
    startDate: string; // StartDate is the email address of the user.
    endDate: string; // EndDate is the timestamp indicating when the missions ends .
}

// MissionsList représente une version simplifiée de l'utilisateur à des fins de liste.
interface MissionsList {
    id: string; // ID is the unique identifier for the user.
    object: string; // Object of the missions.
}
