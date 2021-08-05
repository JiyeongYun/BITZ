package com.osds.bitz.controller.gym;

import com.osds.bitz.model.entity.gym.Gym;
import com.osds.bitz.model.network.request.gym.GymRequest;
import com.osds.bitz.model.network.response.gym.GymResponse;
import com.osds.bitz.service.gym.GymService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/gym")
@Api("Gym 컨트롤러 API V1")
@Slf4j
public class GymController {

    private GymService gymService;

    @PostMapping("/gym")
    @ApiOperation(value="체육관 등록", notes="체육관의 정보를 DB에 저장합니다.")
    public ResponseEntity<GymResponse> createGym(@RequestBody @ApiParam(value="체육관 정보") GymRequest gymRequest) throws  Exception{
        GymResponse response = new GymResponse(gymService.createGym(gymRequest));
        return new ResponseEntity<GymResponse>(response, HttpStatus.OK);
    }

    @GetMapping("/gymlist")
    @ApiOperation(value="체육관 목록조회", notes ="비즈니스 ID로 체육관 목록을 조회합니다.")
    public ResponseEntity<List<Gym>> getGymList(@RequestParam(value="businessId") String businessId){
        List<Gym> response = gymService.getGymList(businessId);
        return new ResponseEntity<List<Gym>>(response, HttpStatus.OK);
    }

    @GetMapping("/gym")
    @ApiOperation(value="체육관 조회", notes="체육관 ID로 체육관을 조회합니다.")
    public ResponseEntity<Gym> getGym(@RequestParam(value="gymId") Long gymId) {
        Gym gym = gymService.getGymById(gymId);
        return new ResponseEntity<Gym>(gym,HttpStatus.OK);
    }


}
