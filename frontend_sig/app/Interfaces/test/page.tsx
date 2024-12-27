"use client"
import React, { useState } from 'react';

interface VotingCenter {
  center_name: string;
  departement_name: string;
  actif: 'ACTIVE' | 'NON ACTIVE';
}

const VotingCentersTable: React.FC = () => {
  const votingCenters: VotingCenter[] = [
    { center_name: 'Center 1', departement_name: 'Department 1', actif: 'ACTIVE' },
    { center_name: 'Center 2', departement_name: 'Department 2', actif: 'NON ACTIVE' },
    { center_name: 'Center 3', departement_name: 'Department 3', actif: 'ACTIVE' },
    { center_name: 'Center 4', departement_name: 'Department 4', actif: 'ACTIVE' },
    { center_name: 'Center 5', departement_name: 'Department 5', actif: 'NON ACTIVE' },
    { center_name: 'Center 6', departement_name: 'Department 6', actif: 'ACTIVE' },
    { center_name: 'Center 7', departement_name: 'Department 7', actif: 'NON ACTIVE' },
    { center_name: 'Center 8', departement_name: 'Department 8', actif: 'ACTIVE' },
    { center_name: 'Center 9', departement_name: 'Department 9', actif: 'NON ACTIVE' },
    { center_name: 'Center 10', departement_name: 'Department 10', actif: 'ACTIVE' },
    { center_name: 'Center 11', departement_name: 'Department 11', actif: 'ACTIVE' },
    { center_name: 'Center 12', departement_name: 'Department 12', actif: 'NON ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'NON ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'NON ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'NON ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'NON ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'NON ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'NON ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'NON ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'NON ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'ACTIVE' },
    { center_name: 'Center 13', departement_name: 'Department 13', actif: 'NON ACTIVE' },
  ];

  const [searchName, setSearchName] = useState('');
  const [searchDepartment, setSearchDepartment] = useState('');
  const [filterActif, setFilterActif] = useState<'ACTIVE' | 'NON ACTIVE' | 'ALL'>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtrage des centres en fonction des critères de recherche
  const filteredCenters = votingCenters.filter((center) => {
    const matchesName = center.center_name.toLowerCase().includes(searchName.toLowerCase());
    const matchesDepartment = center.departement_name.toLowerCase().includes(searchDepartment.toLowerCase());
    const matchesActif = filterActif === 'ALL' || center.actif === filterActif;
    return matchesName && matchesDepartment && matchesActif;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCenters.length / itemsPerPage);
  const displayedCenters = filteredCenters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers pour changer de page
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      {/* Recherche et filtres */}
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="searchName">Rechercher par nom: </label>
        <input
          id="searchName"
          type="text"
          placeholder="Rechercher par nom"
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
            setCurrentPage(1); // Reset pagination
          }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="searchDepartment">Rechercher par département: </label>
        <input
          id="searchDepartment"
          type="text"
          placeholder="Rechercher par département"
          value={searchDepartment}
          onChange={(e) => {
            setSearchDepartment(e.target.value);
            setCurrentPage(1); // Reset pagination
          }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="filterActif">Filtrer par actif: </label>
        <select
          id="filterActif"
          value={filterActif}
          onChange={(e) => {
            setFilterActif(e.target.value as 'ACTIVE' | 'NON ACTIVE' | 'ALL');
            setCurrentPage(1); // Reset pagination
          }}
        >
          <option value="ALL">Tous</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="NON ACTIVE">NON ACTIVE</option>
        </select>
      </div>

      {/* Tableau */}
      <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nom du centre</th>
            <th>Nom du département</th>
            <th>Actif</th>
          </tr>
        </thead>
        <tbody>
          {displayedCenters.length > 0 ? (
            displayedCenters.map((center, index) => (
              <tr key={index}>
                <td>{center.center_name}</td>
                <td>{center.departement_name}</td>
                <td>{center.actif}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: 'center' }}>
                Aucun résultat trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {filteredCenters.length > itemsPerPage && (
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Précédent
          </button>
          <span style={{ margin: '0 10px' }}>
            Page {currentPage} sur {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};

export default VotingCentersTable;

