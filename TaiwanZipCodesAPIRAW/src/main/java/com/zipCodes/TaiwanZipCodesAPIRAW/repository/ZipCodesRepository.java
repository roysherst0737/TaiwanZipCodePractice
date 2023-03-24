package com.zipCodes.TaiwanZipCodesAPIRAW.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.zipCodes.TaiwanZipCodesAPIRAW.domain.ZipCodes;

public interface ZipCodesRepository extends JpaRepository<ZipCodes, Long> {
	
	@Query("SELECT zipCode FROM ZipCodes WHERE id = :id")
	String findData(@Param(value = "id") Long id);

}
