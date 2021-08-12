package com.osds.bitz.controller;

import com.osds.bitz.model.entity.gym.Gym;
import com.osds.bitz.model.network.request.gym.GymRequest;
import com.osds.bitz.model.network.request.gym.GymUpdateRequest;
import com.osds.bitz.model.network.response.gym.GymResponse;
import com.osds.bitz.service.GymService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/gym")
@Api("Gym 컨트롤러 API V1")
@Slf4j
public class GymController {

    private GymService gymService;

    @PostMapping("/gym")
    @ApiOperation(value = "체육관 등록", notes = "체육관의 정보를 DB에 저장합니다.")
    public ResponseEntity<GymResponse> createGym(@RequestBody @ApiParam(value = "체육관 정보") GymRequest gymRequest) {
        gymService.createGym(gymRequest);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/gymlist")
    @ApiOperation(value = "체육관 목록 조회", notes = "이메일로 해당 계정의 체육관 목록을 조회합니다.")
    public ResponseEntity<List<Gym>> getGymList(@RequestParam(value = "businessEmail") String businessEmail) {
        List<Gym> response = gymService.getGymList(businessEmail);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/gym")
    @ApiOperation(value = "체육관 상세 정보 조회", notes = "체육관 ID로 체육관을 조회합니다.")
    public ResponseEntity<Gym> getGym(@RequestParam(value = "gymId") Long gymId) {
        Gym response = gymService.getGymById(gymId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping("/gym")
    @ApiOperation(value = "체육관 업데이트", notes = "체육관을 DB에 업데이트합니다.")
    public ResponseEntity<Gym> updateGym(@RequestBody GymUpdateRequest gymUpdateRequest) {
        Gym gym = gymService.updateGym(gymUpdateRequest);
        if (gym == null)
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/gym")
    @ApiOperation(value = "체육관 삭제", notes = "체육관을 DB에서 삭제합니다.")
    public ResponseEntity deleteGym(@RequestBody Map<String, String> body) {
        if (!gymService.deleteGym(body.get("businessId"), Long.parseLong(body.get("gymId"))))
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        return new ResponseEntity(HttpStatus.OK);
    }

}
